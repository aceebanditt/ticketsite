import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Ticket } from 'lucide-react';
import CategoryTree from '../../categories/CategoryTree';

interface MobileMenuProps {
  isOpen: boolean;
  categories: any[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, categories, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4">
            <CategoryTree 
              categories={categories}
              onSelect={onClose}
            />

            <div className="mt-6 space-y-4">
              <Link
                to="/venues"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={onClose}
              >
                Venues
              </Link>
              <Link
                to="/performers"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={onClose}
              >
                Performers
              </Link>
            </div>

            <div className="mt-8">
              <Link
                to="/sell"
                className="flex items-center justify-center px-4 py-3 rounded-lg
                         bg-gradient-to-r from-[--primary] to-[--primary-dark]
                         text-white font-medium"
                onClick={onClose}
              >
                <Ticket className="h-5 w-5 mr-2" />
                Sell Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}