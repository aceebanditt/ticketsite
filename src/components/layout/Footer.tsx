import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Your Choice Tickets</h3>
            <p className="text-sm mb-4">Your trusted source for event tickets. 100% Buyer Guarantee.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#800020] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-[#800020] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-[#800020] transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-[#800020] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-[#800020] transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/concerts" className="text-sm hover:text-[#800020] transition-colors">Concerts</Link>
              </li>
              <li>
                <Link to="/sports" className="text-sm hover:text-[#800020] transition-colors">Sports</Link>
              </li>
              <li>
                <Link to="/theater" className="text-sm hover:text-[#800020] transition-colors">Theater</Link>
              </li>
              <li>
                <Link to="/comedy" className="text-sm hover:text-[#800020] transition-colors">Comedy</Link>
              </li>
              <li>
                <Link to="/family" className="text-sm hover:text-[#800020] transition-colors">Family</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">1-800-YOUR-TICKETS</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@yourchoicetickets.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white text-sm font-semibold mb-2">Customer Service Hours</h4>
              <p className="text-sm">Monday - Friday: 9AM - 9PM EST</p>
              <p className="text-sm">Saturday - Sunday: 10AM - 6PM EST</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Your Choice Tickets. All rights reserved.</p>
          <p className="mt-2">
            <span>Prices are set by sellers and may be above or below face value. </span>
            <Link to="/buyer-guarantee" className="text-[#800020] hover:text-[#4A0012]">Learn about our Buyer Guarantee</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}