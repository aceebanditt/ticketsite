import { Music } from 'lucide-react';
import { Performer } from '../../types';

interface PerformerCardProps {
  performer: Performer;
}

export default function PerformerCard({ performer }: PerformerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer">
      <div className="relative h-48">
        <img
          src={performer.imageUrl}
          alt={performer.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{performer.name}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Music className="h-4 w-4 mr-2" />
            {performer.category}
          </div>
        </div>
      </div>
    </div>
  );
}