import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

interface CategoryDropdownProps {
  categories: Category[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function CategoryDropdown({ categories, isOpen, onToggle }: CategoryDropdownProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 nav-link"
        onMouseEnter={() => setActiveCategory(null)}
      >
        <span>Categories</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-screen max-w-screen-xl bg-white shadow-lg rounded-b-lg py-6 mt-1">
          <div className="grid grid-cols-4 gap-8 px-8">
            {categories.map(category => (
              <div
                key={category.id}
                className="space-y-4"
                onMouseEnter={() => setActiveCategory(category.id)}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="block font-semibold text-gray-900 hover:text-[--primary]"
                >
                  {category.name}
                </Link>
                {category.subcategories && activeCategory === category.id && (
                  <div className="space-y-2">
                    {category.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/category/${sub.id}`}
                        className="block text-sm text-gray-600 hover:text-[--primary]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}