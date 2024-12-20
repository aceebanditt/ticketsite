import { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface SellTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TicketTier {
  name: string;
  price: string;
  quantity: string;
}

export default function SellTicketsModal({ isOpen, onClose }: SellTicketsModalProps) {
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    { name: 'General Admission', price: '', quantity: '' }
  ]);

  if (!isOpen) return null;

  const addTicketTier = () => {
    setTicketTiers([...ticketTiers, { name: '', price: '', quantity: '' }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sell Your Tickets</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-6">
          {/* Event Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                placeholder="Venue name and address"
              />
            </div>
          </div>

          {/* Ticket Tiers */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Ticket Tiers</h3>
              <button
                type="button"
                onClick={addTicketTier}
                className="text-[#800020] hover:text-[#4A0012] text-sm font-medium"
              >
                + Add Tier
              </button>
            </div>

            {ticketTiers.map((tier, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tier Name</label>
                  <input
                    type="text"
                    value={tier.name}
                    onChange={(e) => {
                      const newTiers = [...ticketTiers];
                      newTiers[index].name = e.target.value;
                      setTicketTiers(newTiers);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => {
                      const newTiers = [...ticketTiers];
                      newTiers[index].price = e.target.value;
                      setTicketTiers(newTiers);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    value={tier.quantity}
                    onChange={(e) => {
                      const newTiers = [...ticketTiers];
                      newTiers[index].quantity = e.target.value;
                      setTicketTiers(newTiers);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#800020] focus:ring-[#800020]"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-[#800020] hover:text-[#4A0012]">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              className="h-4 w-4 text-[#800020] focus:ring-[#800020] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions of selling tickets on this platform
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-white font-medium
                         bg-gradient-to-r from-[#800020] to-[#4A0012]
                         hover:shadow-lg transform hover:-translate-y-0.5
                         transition-all duration-300"
            >
              List Tickets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}