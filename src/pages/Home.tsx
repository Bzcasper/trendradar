
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          YouTube Analytics Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Unlock the power of data-driven content creation with our advanced YouTube analytics platform
        </p>
        <div className="space-x-4">
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-gray-600">Get deep insights into your channel's performance with our comprehensive analytics tools.</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Trend Analysis</h3>
              <p className="text-gray-600">Stay ahead of the curve by identifying emerging trends in your niche.</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Real-time Data</h3>
              <p className="text-gray-600">Monitor your channel's performance with real-time analytics and insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-center">&copy; {new Date().getFullYear()} YouTube Analytics Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
