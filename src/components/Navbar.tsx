import { User, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './search/SearchBar';
import AuthModal from './auth/AuthModal';
import { categories } from '../data/events';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Your Choice Tickets</h1>
            </Link>

            {/* Categories Dropdown */}
            <div className="hidden lg:flex items-center relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/venues" className="text-gray-700 hover:text-indigo-600 font-medium">
                Venues
              </Link>
              <Link to="/performers" className="text-gray-700 hover:text-indigo-600 font-medium">
                Performers
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>

            {/* Mobile Menu Button */}
            <button className="p-2 rounded-full hover:bg-gray-100 lg:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden">
          {/* Add mobile menu implementation here if needed */}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CategorySlider />
    </nav>
  );
}

function CategorySlider() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Categories</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/category/${category.id}`}>
              <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}