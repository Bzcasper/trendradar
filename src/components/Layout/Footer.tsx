
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0A2349] text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <span className="text-[#48D1CC] font-bold">trendradar.ai</span>
            <span className="text-white/60 text-sm ml-4">© {new Date().getFullYear()} All rights reserved</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="https://github.com" className="text-white/80 hover:text-[#48D1CC] transition-colors" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
            </Link>
            <Link to="https://linkedin.com" className="text-white/80 hover:text-[#48D1CC] transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
            </Link>
            <Link to="https://twitter.com" className="text-white/80 hover:text-[#48D1CC] transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} />
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-[#48D1CC] transition-colors">
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
