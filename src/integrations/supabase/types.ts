export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aggregated_trends: {
        Row: {
          aggregated_at: string | null
          id: number
          trend_summary: string
          user_id: string | null
        }
        Insert: {
          aggregated_at?: string | null
          id?: number
          trend_summary: string
          user_id?: string | null
        }
        Update: {
          aggregated_at?: string | null
          id?: number
          trend_summary?: string
          user_id?: string | null
        }
        Relationships: []
      }
      api_users: {
        Row: {
          api_key: string
          created_at: string | null
          email: string
          features: Json | null
          id: string
          rate_limit: number | null
          subscription_tier: string | null
          updated_at: string | null
          usage_stats: Json | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          email: string
          features?: Json | null
          id?: string
          rate_limit?: number | null
          subscription_tier?: string | null
          updated_at?: string | null
          usage_stats?: Json | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          email?: string
          features?: Json | null
          id?: string
          rate_limit?: number | null
          subscription_tier?: string | null
          updated_at?: string | null
          usage_stats?: Json | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          completed_at: string | null
          error: string | null
          id: string
          result: Json | null
          started_at: string | null
          status: string
          workflow_id: string | null
        }
        Insert: {
          completed_at?: string | null
          error?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status: string
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string | null
          error?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "automation_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_workflows: {
        Row: {
          actions: Json[]
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          trigger_config: Json | null
          trigger_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          actions: Json[]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          trigger_config?: Json | null
          trigger_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          actions?: Json[]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_config?: Json | null
          trigger_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          categories: Json | null
          created_at: string | null
          creator_id: string | null
          duration: unknown | null
          extracted_at: string | null
          id: string
          metrics: Json | null
          platform: string
          published_at: string
          sentiment_score: number | null
          tags: Json | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          url: string
          viral_coefficient: number | null
        }
        Insert: {
          categories?: Json | null
          created_at?: string | null
          creator_id?: string | null
          duration?: unknown | null
          extracted_at?: string | null
          id?: string
          metrics?: Json | null
          platform: string
          published_at: string
          sentiment_score?: number | null
          tags?: Json | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          url: string
          viral_coefficient?: number | null
        }
        Update: {
          categories?: Json | null
          created_at?: string | null
          creator_id?: string | null
          duration?: unknown | null
          extracted_at?: string | null
          id?: string
          metrics?: Json | null
          platform?: string
          published_at?: string
          sentiment_score?: number | null
          tags?: Json | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          url?: string
          viral_coefficient?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      content_details: {
        Row: {
          content: string | null
          extracted_at: string | null
          language: string | null
          sentiment_score: number | null
          source_domain: string | null
          summary: string | null
          title: string
          url: string
          word_count: number | null
        }
        Insert: {
          content?: string | null
          extracted_at?: string | null
          language?: string | null
          sentiment_score?: number | null
          source_domain?: string | null
          summary?: string | null
          title: string
          url: string
          word_count?: number | null
        }
        Update: {
          content?: string | null
          extracted_at?: string | null
          language?: string | null
          sentiment_score?: number | null
          source_domain?: string | null
          summary?: string | null
          title?: string
          url?: string
          word_count?: number | null
        }
        Relationships: []
      }
      crawl_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error: string | null
          id: string
          metadata: Json | null
          results: Json | null
          settings: Json | null
          status: string
          url: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          results?: Json | null
          settings?: Json | null
          status?: string
          url: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          results?: Json | null
          settings?: Json | null
          status?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      crawled_content: {
        Row: {
          content: string | null
          embedding: string | null
          extracted_at: string | null
          html: string | null
          id: string
          job_id: string | null
          metadata: Json | null
          title: string | null
          url: string
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          extracted_at?: string | null
          html?: string | null
          id?: string
          job_id?: string | null
          metadata?: Json | null
          title?: string | null
          url: string
        }
        Update: {
          content?: string | null
          embedding?: string | null
          extracted_at?: string | null
          html?: string | null
          id?: string
          job_id?: string | null
          metadata?: Json | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "crawled_content_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "crawl_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          avg_views: number | null
          content_frequency: number | null
          created_at: string | null
          engagement_rate: number | null
          followers: number | null
          id: string
          metadata: Json | null
          monetization_status: boolean | null
          platform: string
          top_categories: Json | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avg_views?: number | null
          content_frequency?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          followers?: number | null
          id?: string
          metadata?: Json | null
          monetization_status?: boolean | null
          platform: string
          top_categories?: Json | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avg_views?: number | null
          content_frequency?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          followers?: number | null
          id?: string
          metadata?: Json | null
          monetization_status?: boolean | null
          platform?: string
          top_categories?: Json | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      diy_projects: {
        Row: {
          category: string | null
          cost_range: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          id: string
          materials: string[] | null
          metrics: Json | null
          platform: string
          summary: string | null
          tags: string[] | null
          time_required: string | null
          title: string
          url: string
        }
        Insert: {
          category?: string | null
          cost_range?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          materials?: string[] | null
          metrics?: Json | null
          platform: string
          summary?: string | null
          tags?: string[] | null
          time_required?: string | null
          title: string
          url: string
        }
        Update: {
          category?: string | null
          cost_range?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          materials?: string[] | null
          metrics?: Json | null
          platform?: string
          summary?: string | null
          tags?: string[] | null
          time_required?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      diy_scrape_results: {
        Row: {
          category: string | null
          description: string | null
          difficulty_level: string | null
          id: string
          image_urls: string[] | null
          materials: string[] | null
          metadata: Json | null
          scraped_at: string | null
          steps: string[] | null
          time_estimate: string | null
          title: string
          url: string
        }
        Insert: {
          category?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          image_urls?: string[] | null
          materials?: string[] | null
          metadata?: Json | null
          scraped_at?: string | null
          steps?: string[] | null
          time_estimate?: string | null
          title: string
          url: string
        }
        Update: {
          category?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          image_urls?: string[] | null
          materials?: string[] | null
          metadata?: Json | null
          scraped_at?: string | null
          steps?: string[] | null
          time_estimate?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      diy_trend_analysis: {
        Row: {
          analysis_date: string
          confidence_score: number
          created_at: string | null
          data_points: number
          id: string
          trend_insights: Json
        }
        Insert: {
          analysis_date: string
          confidence_score: number
          created_at?: string | null
          data_points: number
          id?: string
          trend_insights: Json
        }
        Update: {
          analysis_date?: string
          confidence_score?: number
          created_at?: string | null
          data_points?: number
          id?: string
          trend_insights?: Json
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string | null
          embeddings: string | null
          id: number
          role: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embeddings?: string | null
          id?: number
          role?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embeddings?: string | null
          id?: number
          role?: string | null
        }
        Relationships: []
      }
      generated_content: {
        Row: {
          content_body: string | null
          content_title: string | null
          generated_at: string | null
          id: number
          project_id: number | null
          seo_tags: string[] | null
        }
        Insert: {
          content_body?: string | null
          content_title?: string | null
          generated_at?: string | null
          id?: number
          project_id?: number | null
          seo_tags?: string[] | null
        }
        Update: {
          content_body?: string | null
          content_title?: string | null
          generated_at?: string | null
          id?: number
          project_id?: number | null
          seo_tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_content_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_materials: {
        Row: {
          alternatives: string[] | null
          created_at: string | null
          estimated_cost: number | null
          id: string
          name: string
          optional: boolean | null
          project_url: string | null
          quantity: string | null
        }
        Insert: {
          alternatives?: string[] | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          name: string
          optional?: boolean | null
          project_url?: string | null
          quantity?: string | null
        }
        Update: {
          alternatives?: string[] | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          name?: string
          optional?: boolean | null
          project_url?: string | null
          quantity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_materials_project_url_fkey"
            columns: ["project_url"]
            isOneToOne: false
            referencedRelation: "diy_projects"
            referencedColumns: ["url"]
          },
        ]
      }
      project_steps: {
        Row: {
          created_at: string | null
          description: string
          id: string
          project_url: string | null
          step_number: number | null
          time_estimate: string | null
          tips: string[] | null
          tools_needed: string[] | null
          warnings: string[] | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          project_url?: string | null
          step_number?: number | null
          time_estimate?: string | null
          tips?: string[] | null
          tools_needed?: string[] | null
          warnings?: string[] | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          project_url?: string | null
          step_number?: number | null
          time_estimate?: string | null
          tips?: string[] | null
          tools_needed?: string[] | null
          warnings?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "project_steps_project_url_fkey"
            columns: ["project_url"]
            isOneToOne: false
            referencedRelation: "diy_projects"
            referencedColumns: ["url"]
          },
        ]
      }
      project_tasks: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["task_category"] | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          parent_task_id: string | null
          priority: Database["public"]["Enums"]["task_priority"] | null
          status: Database["public"]["Enums"]["task_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["task_category"] | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["task_category"] | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          id: number
          project_keywords: string[] | null
          project_name: string
          project_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_keywords?: string[] | null
          project_name: string
          project_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_keywords?: string[] | null
          project_name?: string
          project_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      request_logs: {
        Row: {
          api_user_id: string | null
          endpoint: string
          id: string
          response_time: number | null
          status: number
          timestamp: string | null
        }
        Insert: {
          api_user_id?: string | null
          endpoint: string
          id?: string
          response_time?: number | null
          status: number
          timestamp?: string | null
        }
        Update: {
          api_user_id?: string | null
          endpoint?: string
          id?: string
          response_time?: number | null
          status?: number
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_logs_api_user_id_fkey"
            columns: ["api_user_id"]
            isOneToOne: false
            referencedRelation: "api_users"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_content: {
        Row: {
          content: string
          id: number
          scheduled_time: string
          user_id: string | null
        }
        Insert: {
          content: string
          id?: number
          scheduled_time: string
          user_id?: string | null
        }
        Update: {
          content?: string
          id?: number
          scheduled_time?: string
          user_id?: string | null
        }
        Relationships: []
      }
      scheduled_tasks: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_run: string | null
          next_run: string | null
          schedule: string
          task_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule: string
          task_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule?: string
          task_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          created_at: string | null
          id: string
          query: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          query: string
        }
        Update: {
          created_at?: string | null
          id?: string
          query?: string
        }
        Relationships: []
      }
      search_results: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          popularity_score: number
          query: string
          source_url: string
          topic: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          popularity_score: number
          query: string
          source_url: string
          topic: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          popularity_score?: number
          query?: string
          source_url?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: []
      }
      shorts: {
        Row: {
          content: string
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          category: string | null
          content_id: string | null
          created_at: string | null
          id: string
          keywords: string[] | null
          name: string
          relevance_score: number | null
        }
        Insert: {
          category?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          name: string
          relevance_score?: number | null
        }
        Update: {
          category?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          name?: string
          relevance_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      trend_analytics: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          platform: string | null
          timeframe: string | null
          timestamp: string | null
          trend_data: Json
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          platform?: string | null
          timeframe?: string | null
          timestamp?: string | null
          trend_data: Json
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          platform?: string | null
          timeframe?: string | null
          timestamp?: string | null
          trend_data?: Json
        }
        Relationships: []
      }
      trend_insights: {
        Row: {
          avg_engagement: number | null
          avg_trend_score: number | null
          avg_velocity: number | null
          id: number
          time_period: string | null
          total_videos: number | null
        }
        Insert: {
          avg_engagement?: number | null
          avg_trend_score?: number | null
          avg_velocity?: number | null
          id?: number
          time_period?: string | null
          total_videos?: number | null
        }
        Update: {
          avg_engagement?: number | null
          avg_trend_score?: number | null
          avg_velocity?: number | null
          id?: number
          time_period?: string | null
          total_videos?: number | null
        }
        Relationships: []
      }
      trend_metrics: {
        Row: {
          audience_retention: number
          computed_at: string | null
          engagement_rate: number
          historical_data: Json | null
          id: string
          metadata: Json | null
          moving_average: number
          title: string
          trend_acceleration: number
          trending_score: number
          video_id: string
          view_velocity: number
          viral_probability: number
        }
        Insert: {
          audience_retention: number
          computed_at?: string | null
          engagement_rate: number
          historical_data?: Json | null
          id?: string
          metadata?: Json | null
          moving_average: number
          title: string
          trend_acceleration: number
          trending_score: number
          video_id: string
          view_velocity: number
          viral_probability: number
        }
        Update: {
          audience_retention?: number
          computed_at?: string | null
          engagement_rate?: number
          historical_data?: Json | null
          id?: string
          metadata?: Json | null
          moving_average?: number
          title?: string
          trend_acceleration?: number
          trending_score?: number
          video_id?: string
          view_velocity?: number
          viral_probability?: number
        }
        Relationships: []
      }
      trending_diy_shorts: {
        Row: {
          channel_title: string
          created_at: string | null
          diy_category: string | null
          duration: number
          engagement_score: number
          id: string
          published_at: string
          scraped_at: string
          thumbnail_url: string
          title: string
          video_id: string
          view_count: number
        }
        Insert: {
          channel_title: string
          created_at?: string | null
          diy_category?: string | null
          duration: number
          engagement_score: number
          id?: string
          published_at: string
          scraped_at: string
          thumbnail_url: string
          title: string
          video_id: string
          view_count: number
        }
        Update: {
          channel_title?: string
          created_at?: string | null
          diy_category?: string | null
          duration?: number
          engagement_score?: number
          id?: string
          published_at?: string
          scraped_at?: string
          thumbnail_url?: string
          title?: string
          video_id?: string
          view_count?: number
        }
        Relationships: []
      }
      trending_diy_videos: {
        Row: {
          channel_title: string
          created_at: string | null
          diy_category: string | null
          engagement_score: number
          id: string
          published_at: string
          scraped_at: string
          thumbnail_url: string
          title: string
          video_id: string
          view_count: number
        }
        Insert: {
          channel_title: string
          created_at?: string | null
          diy_category?: string | null
          engagement_score: number
          id?: string
          published_at: string
          scraped_at: string
          thumbnail_url: string
          title: string
          video_id: string
          view_count: number
        }
        Update: {
          channel_title?: string
          created_at?: string | null
          diy_category?: string | null
          engagement_score?: number
          id?: string
          published_at?: string
          scraped_at?: string
          thumbnail_url?: string
          title?: string
          video_id?: string
          view_count?: number
        }
        Relationships: []
      }
      trending_projects: {
        Row: {
          created_at: string | null
          details: Json | null
          id: number
          score: number | null
          source: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: number
          score?: number | null
          source?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: number
          score?: number | null
          source?: string | null
          title?: string
        }
        Relationships: []
      }
      trending_topics: {
        Row: {
          created_at: string | null
          id: string
          is_current: boolean | null
          topic: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          topic: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          topic?: string
        }
        Relationships: []
      }
      trends: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trends_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          importance_level: string | null
          is_read: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          importance_level?: string | null
          is_read?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          importance_level?: string | null
          is_read?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: []
      }
      trends_analysis: {
        Row: {
          ai_suggestions: string | null
          category: string | null
          comments_count: number | null
          competitor_data: Json | null
          created_at: string | null
          engagement_rate: number | null
          hashtags: Json | null
          id: string
          likes_count: number | null
          performance_score: number | null
          platform: string
          shares_count: number | null
          updated_at: string | null
          user_id: string
          video_id: string | null
          video_title: string | null
          views_count: number | null
          viral_patterns: Json | null
        }
        Insert: {
          ai_suggestions?: string | null
          category?: string | null
          comments_count?: number | null
          competitor_data?: Json | null
          created_at?: string | null
          engagement_rate?: number | null
          hashtags?: Json | null
          id?: string
          likes_count?: number | null
          performance_score?: number | null
          platform: string
          shares_count?: number | null
          updated_at?: string | null
          user_id: string
          video_id?: string | null
          video_title?: string | null
          views_count?: number | null
          viral_patterns?: Json | null
        }
        Update: {
          ai_suggestions?: string | null
          category?: string | null
          comments_count?: number | null
          competitor_data?: Json | null
          created_at?: string | null
          engagement_rate?: number | null
          hashtags?: Json | null
          id?: string
          likes_count?: number | null
          performance_score?: number | null
          platform?: string
          shares_count?: number | null
          updated_at?: string | null
          user_id?: string
          video_id?: string | null
          video_title?: string | null
          views_count?: number | null
          viral_patterns?: Json | null
        }
        Relationships: []
      }
      video_workflows: {
        Row: {
          created_at: string | null
          id: number
          log: string | null
          status: string | null
          step: string | null
          video_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          log?: string | null
          status?: string | null
          step?: string | null
          video_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          log?: string | null
          status?: string | null
          step?: string | null
          video_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_workflows_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          audio_url: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      youtube_accounts: {
        Row: {
          access_token: string
          channel_id: string | null
          created_at: string | null
          id: string
          refresh_token: string
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          channel_id?: string | null
          created_at?: string | null
          id?: string
          refresh_token: string
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          channel_id?: string | null
          created_at?: string | null
          id?: string
          refresh_token?: string
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      youtube_channel_analytics: {
        Row: {
          analytics_data: Json | null
          average_view_duration: unknown | null
          channel_id: string
          collected_at: string | null
          id: string
          subscriber_count: number | null
          total_views: number | null
          video_count: number | null
        }
        Insert: {
          analytics_data?: Json | null
          average_view_duration?: unknown | null
          channel_id: string
          collected_at?: string | null
          id?: string
          subscriber_count?: number | null
          total_views?: number | null
          video_count?: number | null
        }
        Update: {
          analytics_data?: Json | null
          average_view_duration?: unknown | null
          channel_id?: string
          collected_at?: string | null
          id?: string
          subscriber_count?: number | null
          total_views?: number | null
          video_count?: number | null
        }
        Relationships: []
      }
      youtube_search_results: {
        Row: {
          category: string | null
          comments: number | null
          created_at: string | null
          engagement_score: number | null
          id: string
          likes: number | null
          query: string
          title: string
          video_id: string
          views: number | null
        }
        Insert: {
          category?: string | null
          comments?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          likes?: number | null
          query: string
          title: string
          video_id: string
          views?: number | null
        }
        Update: {
          category?: string | null
          comments?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          likes?: number | null
          query?: string
          title?: string
          video_id?: string
          views?: number | null
        }
        Relationships: []
      }
      youtube_video_metrics: {
        Row: {
          channel_id: string
          comment_count: number | null
          description: string | null
          engagement_rate: number | null
          id: string
          last_updated: string | null
          like_count: number | null
          metadata: Json | null
          published_at: string
          retention_score: number | null
          title: string
          trending_score: number | null
          video_id: string
          view_count: number | null
        }
        Insert: {
          channel_id: string
          comment_count?: number | null
          description?: string | null
          engagement_rate?: number | null
          id?: string
          last_updated?: string | null
          like_count?: number | null
          metadata?: Json | null
          published_at: string
          retention_score?: number | null
          title: string
          trending_score?: number | null
          video_id: string
          view_count?: number | null
        }
        Update: {
          channel_id?: string
          comment_count?: number | null
          description?: string | null
          engagement_rate?: number | null
          id?: string
          last_updated?: string | null
          like_count?: number | null
          metadata?: Json | null
          published_at?: string
          retention_score?: number | null
          title?: string
          trending_score?: number | null
          video_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          category: string | null
          comments: number | null
          created_at: string | null
          description: string | null
          engagement_score: number | null
          id: string
          likes: number | null
          published_at: string | null
          thumbnail_url: string | null
          title: string
          video_id: string
          views: number | null
        }
        Insert: {
          category?: string | null
          comments?: number | null
          created_at?: string | null
          description?: string | null
          engagement_score?: number | null
          id?: string
          likes?: number | null
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          video_id: string
          views?: number | null
        }
        Update: {
          category?: string | null
          comments?: number | null
          created_at?: string | null
          description?: string | null
          engagement_score?: number | null
          id?: string
          likes?: number | null
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          video_id?: string
          views?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      project_search: {
        Row: {
          category: string | null
          cost_range: string | null
          difficulty_level: string | null
          id: string | null
          materials_needed: string[] | null
          summary: string | null
          time_required: string | null
          title: string | null
          total_steps: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      analyze_diy_trends: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["trend_analysis"][]
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      calculate_engagement_score: {
        Args: {
          views: number
          likes: number
          comments: number
        }
        Returns: number
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      get_date_ranges: {
        Args: Record<PropertyKey, never>
        Returns: {
          window_start: string
          window_end: string
        }[]
      }
      get_diy_trends: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_relevant_docs: {
        Args: {
          query_embedding: string
          threshold: number
          docs_count: number
        }
        Returns: {
          id: number
          content: string
          similarity: number
        }[]
      }
      get_trending_content: {
        Args: {
          p_platform?: string
          p_category?: string
          p_timeframe?: unknown
        }
        Returns: {
          content_id: string
          platform: string
          title: string
          metrics: Json
          trend_score: number
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      log_api_request: {
        Args: {
          p_api_user_id: string
          p_endpoint: string
          p_status: number
          p_response_time: number
        }
        Returns: undefined
      }
      process_diy_trends: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      process_scheduled_tasks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_crawled_content: {
        Args: {
          query_embedding: string
          similarity_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          url: string
          title: string
          content: string
          similarity: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      task_category:
        | "issue"
        | "improvement"
        | "feature"
        | "bug"
        | "security"
        | "performance"
      task_priority: "low" | "medium" | "high" | "critical"
      task_status: "pending" | "in_progress" | "completed" | "blocked"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
      trend_analysis: {
        trend_id: string | null
        title: string | null
        description: string | null
        engagement_score: number | null
        sentiment_score: number | null
        velocity_score: number | null
        cross_platform_score: number | null
        total_score: number | null
        sources: Json | null
        recommendations: Json | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
