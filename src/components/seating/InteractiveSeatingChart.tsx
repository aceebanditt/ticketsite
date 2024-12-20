import { useState, useEffect } from 'react';
import { ticketmasterApi } from '../../services/ticketmaster';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface Props {
  venueId: string;
  eventId: string;
  onSectionSelect: (sectionId: string) => void;
}

export default function InteractiveSeatingChart({ venueId, eventId, onSectionSelect }: Props) {
  const [seatingData, setSeatingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSeatingData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load data sequentially to avoid potential race conditions
        const eventSeats = await ticketmasterApi.getEventSeats(eventId);
        if (!mounted) return;

        const venueSeating = await ticketmasterApi.getVenueSeating(venueId);
        if (!mounted) return;

        // Combine the data into a clean, serializable object
        const combinedData = {
          seatmap: venueSeating?.seatmap || null,
          sections: eventSeats?.sections || [],
          availability: eventSeats?.availability || {}
        };

        setSeatingData(combinedData);
      } catch (err) {
        if (mounted) {
          setError('Failed to load seating chart');
          console.error('Seating chart error:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (venueId && eventId) {
      loadSeatingData();
    }

    return () => {
      mounted = false;
    };
  }, [venueId, eventId]);

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    onSectionSelect(sectionId);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!seatingData?.seatmap) return <ErrorMessage message="No seating chart available" />;

  // Display static seatmap if available
  if (seatingData.seatmap.staticUrl) {
    return (
      <div className="relative">
        <img
          src={seatingData.seatmap.staticUrl}
          alt="Venue Seating Chart"
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm">
          Click on sections for availability
        </div>
      </div>
    );
  }

  // Fallback to interactive grid layout
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-4 gap-2 h-full">
          {seatingData.sections.map((section: any, index: number) => {
            const isSelected = selectedSection === section.id;
            
            return (
              <button
                key={section.id || `section-${index}`}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  rounded-md flex items-center justify-center text-sm font-medium
                  transition-colors duration-200
                  ${isSelected 
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white hover:bg-indigo-50 text-gray-900'
                  }
                  border-2
                  ${isSelected ? 'border-indigo-600' : 'border-gray-200'}
                `}
              >
                {section.name || `Section ${index + 1}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}