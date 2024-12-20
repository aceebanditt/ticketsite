import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
  onSelect?: (categoryId: string) => void;
}

export default function CategoryTree({ categories, onSelect }: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasSubcategories = category.subcategories?.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    return (
      <div key={category.id} style={{ marginLeft: `${level * 1.5}rem` }}>
        <div className="flex items-center py-2">
          {hasSubcategories && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1 hover:bg-gray-100 rounded-full mr-1"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          
          <Link
            to={`/category/${category.id}`}
            onClick={() => onSelect?.(category.id)}
            className="flex-1 hover:text-[--primary] transition-colors"
          >
            {category.name}
          </Link>
        </div>

        {hasSubcategories && isExpanded && (
          <div className="ml-2">
            {category.subcategories?.map(subcategory => 
              renderCategory(subcategory, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-1">
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  );
}