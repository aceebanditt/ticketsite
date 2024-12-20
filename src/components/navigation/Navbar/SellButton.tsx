import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export default function SellButton() {
  return (
    <Link
      to="/sell"
      className="hidden md:flex items-center px-6 py-2.5 rounded-full text-white font-medium
                 bg-gradient-to-r from-[--primary] to-[--primary-dark]
                 hover:shadow-lg transform hover:-translate-y-0.5 
                 transition-all duration-300 whitespace-nowrap"
    >
      <Ticket className="h-5 w-5 mr-2" />
      Sell Tickets
    </Link>
  );
}