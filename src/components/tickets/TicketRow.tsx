import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TicketRowProps {
  ticket: any;
  priceRanges?: any[];
}

export default function TicketRow({ ticket, priceRanges }: TicketRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg hover:border-indigo-500 transition-colors">
      <div
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <p className="font-semibold">{ticket.section}</p>
          <p className="text-sm text-gray-500">Row {ticket.row}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">${ticket.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">ea</p>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <select className="border rounded px-2 py-1">
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => {/* Implement checkout logic */}}
            >
              Buy Now
            </button>
            <div className="text-xs text-gray-500">
              <p>✓ 100% Buyer Guarantee</p>
              <p>✓ Instant Digital Delivery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}