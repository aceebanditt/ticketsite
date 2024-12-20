import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface TicketAvailabilityProps {
  status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT';
  remaining?: number;
}

export default function TicketAvailability({ status, remaining }: TicketAvailabilityProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'AVAILABLE':
        return {
          icon: CheckCircle,
          text: 'Available',
          className: 'text-green-600'
        };
      case 'LIMITED':
        return {
          icon: Clock,
          text: `Only ${remaining} left`,
          className: 'text-yellow-600'
        };
      case 'SOLD_OUT':
        return {
          icon: AlertCircle,
          text: 'Sold Out',
          className: 'text-red-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center ${config.className}`}>
      <Icon className="w-4 h-4 mr-1" />
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
}