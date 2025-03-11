
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Calendar, User, Tag } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Understanding YouTube Analytics: A Comprehensive Guide",
      excerpt: "Learn how to decode YouTube analytics and use data to grow your channel effectively.",
      date: "March 15, 2024",
      author: "Sarah Johnson",
      category: "Analytics",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Content Strategy Tips for 2024",
      excerpt: "Discover the latest content strategies that are driving growth for successful creators this year.",
      date: "March 10, 2024",
      author: "Michael Chen",
      category: "Strategy",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      title: "How AI is Transforming YouTube Content Creation",
      excerpt: "Explore how artificial intelligence is revolutionizing the way creators plan, produce, and optimize content.",
      date: "March 5, 2024",
      author: "Alex Rivera",
      category: "Technology",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Maximizing Engagement: Beyond Views and Likes",
      excerpt: "Why engagement metrics matter more than ever and how to boost them on your channel.",
      date: "February 28, 2024",
      author: "Taylor Smith",
      category: "Engagement",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2349] to-[#0F2D5E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:text-[#48D1CC]"
        >
          ← Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-white/80 mb-12 text-lg">Insights and strategies for YouTube creators</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-[#0A2349]/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-[#48D1CC]/20 flex flex-col h-full">
              <div className="h-48 bg-[#48D1CC]/10 flex items-center justify-center">
                <FileText size={48} className="text-[#48D1CC]/50" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-white/60 mb-3">
                  <span className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" /> {post.date}
                  </span>
                  <span className="flex items-center">
                    <Tag size={14} className="mr-1" /> {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#48D1CC]">{post.title}</h3>
                <p className="text-white/80 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60 flex items-center">
                    <User size={14} className="mr-1" /> {post.author}
                  </span>
                  <Button variant="ghost" className="text-[#48D1CC] hover:text-white p-0">
                    Read more →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-6">Get the latest articles, tips, and trends delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-lg bg-white/10 border border-[#48D1CC]/30 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-[#48D1CC]"
            />
            <Button className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC]">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
