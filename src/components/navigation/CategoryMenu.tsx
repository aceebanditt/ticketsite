```tsx
import { Link } from 'react-router-dom';
import { Music, Trophy, Theater, Laugh, Users } from 'lucide-react';

interface CategoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'concerts', name: 'Concerts', icon: Music, path: '/concerts' },
  { id: 'sports', name: 'Sports', icon: Trophy, path: '/sports' },
  { id: 'theater', name: 'Theater', icon: Theater, path: '/theater' },
  { id: 'comedy', name: 'Comedy', icon: Laugh, path: '/comedy' },
  { id: 'family', name: 'Family', icon: Users, path: '/family' }
];

export default function CategoryMenu({ isOpen, onClose }: CategoryMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 right-0 bg-white shadow-lg border-t"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map(({ id, name, icon: Icon, path }) => (
            <Link
              key={id}
              to={path}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Icon className="h-8 w-8 text-[--primary] mb-2" />
              <span className="text-gray-900 font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```