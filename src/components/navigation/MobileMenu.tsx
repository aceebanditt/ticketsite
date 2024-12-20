import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Ticket, ChevronRight } from 'lucide-react';
import Container from '../layout/Container';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <Container>
          <div className="flex flex-col h-full py-6">
            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto">
              <div className="space-y-1">
                {[
                  { to: '/events', label: 'Events' },
                  { to: '/venues', label: 'Venues' },
                  { to: '/performers', label: 'Performers' },
                  { to: '/sports', label: 'Sports' },
                  { to: '/concerts', label: 'Concerts' },
                  { to: '/theater', label: 'Theater' }
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={onClose}
                  >
                    <span className="text-gray-900 font-medium">{link.label}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/signin"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="font-medium">Sign In</span>
                </Link>

                <button
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg
                           bg-gradient-to-r from-[--primary] to-[--primary-dark] 
                           text-white transition-colors"
                >
                  <Ticket className="h-5 w-5 mr-3" />
                  <span className="font-medium">Sell</span>
                </button>
              </div>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}