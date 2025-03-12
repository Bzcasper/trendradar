
import { TrendingItem } from "@/utils/api/types";

const mockTrendData: TrendingItem[] = [
  {
    id: '1',
    video_id: 'dQw4w9WgXcQ',
    title: 'How AI is Transforming Content Creation',
    views: 1250000,
    likes: 87500,
    comments: 6200,
    category: 'Technology',
    platform: 'YouTube',
    thumbnail_url: 'https://i.imgur.com/jNNT4LE.jpeg',
    published_at: '2024-01-15T12:00:00Z',
    description: 'Exploring how artificial intelligence is changing the way creators make content for platforms like YouTube.',
    engagement_rate: 7.5,
    view_velocity: 5200,
    trending_score: 85.3,
    viral_probability: 0.78,
    keywords: [
      { keyword: 'AI', count: 15 },
      { keyword: 'content', count: 12 },
      { keyword: 'creator', count: 8 },
      { keyword: 'youtube', count: 6 }
    ]
  },
  {
    id: '2',
    video_id: 'xvFZjo5PgG0',
    title: 'Top 10 Digital Marketing Strategies for 2024',
    views: 789000,
    likes: 45000,
    comments: 3800,
    category: 'Marketing',
    platform: 'YouTube',
    thumbnail_url: 'https://i.imgur.com/XKGP5zB.jpeg',
    published_at: '2024-02-05T14:30:00Z',
    description: 'The most effective digital marketing strategies that businesses should focus on in 2024.',
    engagement_rate: 6.2,
    view_velocity: 3900,
    trending_score: 72.1,
    viral_probability: 0.65,
    keywords: [
      { keyword: 'marketing', count: 18 },
      { keyword: 'digital', count: 14 },
      { keyword: 'strategy', count: 10 },
      { keyword: 'business', count: 7 }
    ]
  },
  {
    id: '3',
    video_id: 'fC7oUOUEEi4',
    title: 'The Future of Electric Vehicles: Beyond Tesla',
    views: 1450000,
    likes: 92000,
    comments: 8500,
    category: 'Automotive',
    platform: 'YouTube',
    thumbnail_url: 'https://i.imgur.com/DQTgpyS.jpeg',
    published_at: '2023-12-18T09:15:00Z',
    description: 'How the electric vehicle industry is evolving beyond Tesla, with new players and technologies.',
    engagement_rate: 6.9,
    view_velocity: 4800,
    trending_score: 79.5,
    viral_probability: 0.72,
    keywords: [
      { keyword: 'electric', count: 16 },
      { keyword: 'vehicle', count: 14 },
      { keyword: 'tesla', count: 12 },
      { keyword: 'automotive', count: 8 }
    ]
  },
  {
    id: '4',
    video_id: 'j5a0jTc9S10',
    title: 'Mindfulness Techniques for Work-Life Balance',
    views: 620000,
    likes: 41000,
    comments: 3200,
    category: 'Lifestyle',
    platform: 'Twitter',
    thumbnail_url: 'https://i.imgur.com/TLsKlGH.jpeg',
    published_at: '2024-01-28T16:45:00Z',
    description: 'Practical mindfulness techniques to help achieve better work-life balance in a fast-paced world.',
    engagement_rate: 7.1,
    view_velocity: 2900,
    trending_score: 68.4,
    viral_probability: 0.61,
    keywords: [
      { keyword: 'mindfulness', count: 15 },
      { keyword: 'balance', count: 12 },
      { keyword: 'work', count: 10 },
      { keyword: 'lifestyle', count: 8 }
    ]
  },
  {
    id: '5',
    video_id: 'sAn7baRbhx4',
    title: 'Cryptocurrency Trends for 2024: Beyond Bitcoin',
    views: 980000,
    likes: 56000,
    comments: 7200,
    category: 'Finance',
    platform: 'Reddit',
    thumbnail_url: 'https://i.imgur.com/5zGu0Dl.jpeg',
    published_at: '2024-02-10T11:30:00Z',
    description: 'Exploring the evolving world of cryptocurrencies and what to expect in 2024.',
    engagement_rate: 6.5,
    view_velocity: 5100,
    trending_score: 76.8,
    viral_probability: 0.69,
    keywords: [
      { keyword: 'crypto', count: 18 },
      { keyword: 'bitcoin', count: 14 },
      { keyword: 'finance', count: 10 },
      { keyword: 'blockchain', count: 9 }
    ]
  },
  {
    id: '6',
    video_id: 'JBtifqJkODc',
    title: 'The Science of Productivity: Work Smarter, Not Harder',
    views: 875000,
    likes: 62000,
    comments: 4500,
    category: 'Education',
    platform: 'YouTube',
    thumbnail_url: 'https://i.imgur.com/zeCJIFp.jpeg',
    published_at: '2023-12-05T10:00:00Z',
    description: 'Scientific approaches to increasing productivity while reducing burnout and stress.',
    engagement_rate: 7.6,
    view_velocity: 3200,
    trending_score: 71.2,
    viral_probability: 0.64,
    keywords: [
      { keyword: 'productivity', count: 16 },
      { keyword: 'science', count: 12 },
      { keyword: 'work', count: 10 },
      { keyword: 'efficiency', count: 8 }
    ]
  },
  {
    id: '7',
    video_id: 'QH2-TGUlwu4',
    title: 'Sustainable Fashion: The Future of Style',
    views: 580000,
    likes: 38000,
    comments: 2900,
    category: 'Fashion',
    platform: 'TikTok',
    thumbnail_url: 'https://i.imgur.com/QzLY145.jpeg',
    published_at: '2024-01-20T13:15:00Z',
    description: 'How sustainable practices are transforming the fashion industry and what consumers should know.',
    engagement_rate: 7.1,
    view_velocity: 2400,
    trending_score: 65.9,
    viral_probability: 0.58,
    keywords: [
      { keyword: 'sustainable', count: 14 },
      { keyword: 'fashion', count: 12 },
      { keyword: 'style', count: 9 },
      { keyword: 'eco', count: 7 }
    ]
  },
  {
    id: '8',
    video_id: '_C0fmFsfkTk',
    title: "Plant-Based Diet: A Complete Beginner's Guide",
    views: 725000,
    likes: 48000,
    comments: 5200,
    category: 'Food',
    platform: 'News',
    thumbnail_url: 'https://i.imgur.com/YKSbEea.jpeg',
    published_at: '2024-02-08T08:45:00Z',
    description: 'Everything you need to know to get started with a plant-based diet, including meal plans and nutrition advice.',
    engagement_rate: 7.3,
    view_velocity: 3100,
    trending_score: 69.7,
    viral_probability: 0.62,
    keywords: [
      { keyword: 'plant', count: 16 },
      { keyword: 'diet', count: 14 },
      { keyword: 'vegan', count: 10 },
      { keyword: 'nutrition', count: 8 }
    ]
  },
  {
    id: '9',
    video_id: 'L_jWHffIx5E',
    title: 'Web3 Explained: The Future of the Internet',
    views: 1120000,
    likes: 76000,
    comments: 6800,
    category: 'Technology',
    platform: 'YouTube',
    thumbnail_url: 'https://i.imgur.com/EexQehX.jpeg',
    published_at: '2023-11-30T15:30:00Z',
    description: "A comprehensive explanation of Web3, blockchain, and how they're shaping the next generation of the internet.",
    engagement_rate: 7.4,
    view_velocity: 4600,
    trending_score: 78.2,
    viral_probability: 0.71,
    keywords: [
      { keyword: 'web3', count: 18 },
      { keyword: 'blockchain', count: 15 },
      { keyword: 'internet', count: 12 },
      { keyword: 'decentralized', count: 10 }
    ]
  },
  {
    id: '10',
    video_id: 'uMPwilnkwLs',
    title: 'Mental Health in the Digital Age: Finding Balance',
    views: 890000,
    likes: 67000,
    comments: 5900,
    category: 'Health',
    platform: 'Wikipedia',
    thumbnail_url: 'https://i.imgur.com/Sn9Ntx9.jpeg',
    published_at: '2024-01-12T12:30:00Z',
    description: 'Strategies for maintaining good mental health in an increasingly connected and digital world.',
    engagement_rate: 8.2,
    view_velocity: 3800,
    trending_score: 74.5,
    viral_probability: 0.67,
    keywords: [
      { keyword: 'mental', count: 16 },
      { keyword: 'health', count: 15 },
      { keyword: 'digital', count: 11 },
      { keyword: 'balance', count: 8 }
    ]
  }
];

export default mockTrendData;
