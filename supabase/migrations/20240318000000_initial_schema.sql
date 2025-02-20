
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Users and Authentication
CREATE TYPE user_role AS ENUM ('free', 'pro', 'enterprise', 'admin');

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company TEXT,
    role user_role DEFAULT 'free',
    avatar_url TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

CREATE INDEX idx_user_profiles_email ON public.user_profiles USING btree (email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles USING btree (role);

-- Content Analysis and Tracking
CREATE TYPE content_type AS ENUM ('video', 'article', 'social_post', 'story');
CREATE TYPE platform AS ENUM ('youtube', 'tiktok', 'instagram', 'twitter', 'linkedin');

CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform platform NOT NULL,
    content_type content_type NOT NULL,
    external_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    published_at TIMESTAMPTZ NOT NULL,
    metadata JSONB DEFAULT '{}',
    embedding vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(platform, external_id)
);

CREATE INDEX idx_content_items_platform ON public.content_items USING btree (platform);
CREATE INDEX idx_content_items_published_at ON public.content_items USING btree (published_at);
CREATE INDEX idx_content_items_embedding ON public.content_items USING hnsw (embedding vector_cosine_ops);

-- Metrics and Analytics
CREATE TABLE IF NOT EXISTS public.content_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES public.content_items(id) ON DELETE CASCADE,
    views BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    comments BIGINT DEFAULT 0,
    shares BIGINT DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    watch_time_seconds BIGINT DEFAULT 0,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(content_id, recorded_at)
);

CREATE INDEX idx_content_metrics_content_id ON public.content_metrics USING btree (content_id);
CREATE INDEX idx_content_metrics_recorded_at ON public.content_metrics USING btree (recorded_at);

-- Trend Analysis
CREATE TABLE IF NOT EXISTS public.trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    peak_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status TEXT DEFAULT 'active',
    confidence_score DECIMAL(5,2),
    velocity_score DECIMAL(5,2),
    related_keywords TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trends_name ON public.trends USING gin (name gin_trgm_ops);
CREATE INDEX idx_trends_status ON public.trends USING btree (status);
CREATE INDEX idx_trends_dates ON public.trends USING btree (start_date, peak_date, end_date);

-- User Workspaces and Projects
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workspace_members (
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

-- Reports and Alerts
CREATE TABLE IF NOT EXISTS public.trend_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    date_range tstzrange NOT NULL,
    trends UUID[] REFERENCES public.trends(id),
    insights JSONB DEFAULT '{}',
    created_by UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.trend_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    trend_id UUID REFERENCES public.trends(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL,
    threshold DECIMAL(10,2),
    status TEXT DEFAULT 'active',
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS Policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trend_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trend_alerts ENABLE ROW LEVEL SECURITY;

-- User Profiles Policy
CREATE POLICY "Users can view their own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Workspaces Policies
CREATE POLICY "Users can view workspaces they are members of"
    ON public.workspaces FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = id
            AND user_id = auth.uid()
        )
        OR owner_id = auth.uid()
    );

CREATE POLICY "Workspace owners can update their workspaces"
    ON public.workspaces FOR UPDATE
    USING (owner_id = auth.uid());

-- Workspace Members Policies
CREATE POLICY "Users can view members of their workspaces"
    ON public.workspace_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM public.workspace_members
                    WHERE workspace_id = id
                    AND user_id = auth.uid()
                )
            )
        )
    );

-- Functions for Trend Analysis
CREATE OR REPLACE FUNCTION calculate_trend_velocity(
    views_current BIGINT,
    views_previous BIGINT,
    time_difference INTERVAL
) RETURNS DECIMAL AS $$
BEGIN
    RETURN (views_current - views_previous)::DECIMAL / 
           EXTRACT(EPOCH FROM time_difference);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_trend_metrics() RETURNS trigger AS $$
BEGIN
    UPDATE public.trends
    SET 
        velocity_score = calculate_trend_velocity(
            NEW.views,
            (
                SELECT views 
                FROM public.content_metrics 
                WHERE content_id = NEW.content_id 
                ORDER BY recorded_at DESC 
                LIMIT 1 OFFSET 1
            ),
            NEW.recorded_at - (
                SELECT recorded_at 
                FROM public.content_metrics 
                WHERE content_id = NEW.content_id 
                ORDER BY recorded_at DESC 
                LIMIT 1 OFFSET 1
            )
        ),
        updated_at = NOW()
    WHERE id = NEW.content_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trend_metrics_trigger
    AFTER INSERT ON public.content_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_trend_metrics();

-- Create materialized view for trending content
CREATE MATERIALIZED VIEW trending_content AS
SELECT 
    ci.id,
    ci.platform,
    ci.content_type,
    ci.title,
    ci.url,
    cm.views,
    cm.likes,
    cm.comments,
    cm.shares,
    cm.engagement_rate,
    calculate_trend_velocity(
        cm.views,
        lag(cm.views) OVER (PARTITION BY ci.id ORDER BY cm.recorded_at),
        cm.recorded_at - lag(cm.recorded_at) OVER (PARTITION BY ci.id ORDER BY cm.recorded_at)
    ) as velocity_score
FROM 
    public.content_items ci
    JOIN public.content_metrics cm ON ci.id = cm.content_id
WHERE 
    cm.recorded_at >= NOW() - INTERVAL '24 hours'
ORDER BY 
    velocity_score DESC;

CREATE UNIQUE INDEX ON trending_content (id);

-- Refresh materialized view periodically
CREATE OR REPLACE FUNCTION refresh_trending_content()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY trending_content;
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to refresh the materialized view every hour
SELECT cron.schedule(
    'refresh_trending_content',
    '0 * * * *',
    'SELECT refresh_trending_content()'
);

COMMIT;
