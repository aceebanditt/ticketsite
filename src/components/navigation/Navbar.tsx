import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Ticket } from 'lucide-react';
import NavLinks from './NavLinks';
import Container from '../layout/Container';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 text-2xl font-bold text-[--primary] whitespace-nowrap mr-8 lg:mr-16"
          >
            Your Choice Tickets
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1">
            <NavLinks />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/signin"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-[--primary] transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </Link>

            <button
              className="hidden md:flex items-center px-4 py-2 rounded-full 
                       bg-gradient-to-r from-[--primary] to-[--primary-dark] 
                       text-white hover:shadow-lg transform hover:-translate-y-0.5 
                       transition-all duration-300"
            >
              <Ticket className="h-5 w-5 mr-2" />
              <span className="whitespace-nowrap">Sell</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}