import { useState } from 'react';
import StaticSeatingChart from './StaticSeatingChart';
import InteractiveSeatingGrid from './InteractiveSeatingGrid';
import { useSeatingData } from '../../hooks/useSeatingData';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface Props {
  venueId: string;
  eventId: string;
  onSectionSelect: (sectionId: string) => void;
}

export default function SeatingChartContainer({ venueId, eventId, onSectionSelect }: Props) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const { seatingData, loading, error } = useSeatingData(venueId, eventId);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    onSectionSelect(sectionId);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!seatingData) return <ErrorMessage message="No seating chart available" />;

  // Simplified seating chart display to avoid complex data handling
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Seating Chart</h2>
      {seatingData.staticUrl ? (
        <StaticSeatingChart imageUrl={seatingData.staticUrl} />
      ) : (
        <div className="text-center py-4 text-gray-500">
          Interactive seating chart not available
        </div>
      )}
    </div>
  );
}