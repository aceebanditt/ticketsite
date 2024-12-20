import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import CategoryDropdown from './CategoryDropdown';
import MobileMenu from './MobileMenu';
import SellButton from './SellButton';
import SearchBar from '../../search/SearchBar';
import { eventCategories } from '../../../data/categories';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[--primary]">
              EventsHub
            </Link>

            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-8">
              <CategoryDropdown 
                categories={eventCategories}
                isOpen={isCategoryDropdownOpen}
                onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              />
              <Link to="/venues" className="nav-link">Venues</Link>
              <Link to="/performers" className="nav-link">Performers</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block w-72">
              <SearchBar />
            </div>

            <SellButton />

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden py-4">
            <SearchBar />
          </div>
        )}
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        categories={eventCategories}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}