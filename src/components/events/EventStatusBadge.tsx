import { AlertCircle, Clock, Ban } from 'lucide-react';

interface EventStatusBadgeProps {
  status: string;
  className?: string;
}

export default function EventStatusBadge({ status, className = '' }: EventStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'CANCELLED':
        return {
          icon: Ban,
          text: 'Cancelled',
          className: 'bg-red-100 text-red-800'
        };
      case 'POSTPONED':
        return {
          icon: Clock,
          text: 'Postponed',
          className: 'bg-yellow-100 text-yellow-800'
        };
      case 'RESCHEDULED':
        return {
          icon: Clock,
          text: 'Rescheduled',
          className: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          icon: AlertCircle,
          text: status,
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.text}
    </div>
  );
}