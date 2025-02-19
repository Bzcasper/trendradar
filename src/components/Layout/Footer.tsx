
import { Link } from "react-router-dom";
import { Mail, FileText } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0A2349] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#48D1CC]">trendradar.ai</h3>
            <p className="text-sm text-white/80">
              Empowering YouTube creators with AI-driven analytics and content optimization.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-[#48D1CC] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-[#48D1CC] transition-colors inline-flex items-center gap-2">
                  <FileText size={16} />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-[#48D1CC] transition-colors inline-flex items-center gap-2">
                  <FileText size={16} />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-[#48D1CC] transition-colors inline-flex items-center gap-2">
                  <Mail size={16} />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} trendradar.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
