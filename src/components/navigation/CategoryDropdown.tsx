import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: Category[];
}

export default function CategoryDropdown({ isOpen, setIsOpen, categories }: CategoryDropdownProps) {
  return (
    <div className="hidden lg:flex items-center relative">
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <span>Categories</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
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
  );
}