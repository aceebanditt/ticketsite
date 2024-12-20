import { useState, useEffect } from 'react';
import { useRealTimeTickets } from '../../hooks/useRealTimeTickets';
import TicketRow from './TicketRow';
import LoadingSpinner from '../common/LoadingSpinner';

interface TicketListProps {
  eventId: string;
  selectedSection: string | null;
  priceRanges?: any[];
}

export default function TicketList({ eventId, selectedSection, priceRanges }: TicketListProps) {
  const { tickets, loading, error } = useRealTimeTickets(eventId);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    if (selectedSection) {
      setFilteredTickets(tickets.filter(ticket => ticket.section === selectedSection));
    } else {
      setFilteredTickets(tickets);
    }
  }, [selectedSection, tickets]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Failed to load tickets</div>;
  if (filteredTickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tickets available{selectedSection ? ` in section ${selectedSection}` : ''}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTickets.map((ticket) => (
        <TicketRow
          key={ticket.id}
          ticket={ticket}
          priceRanges={priceRanges}
        />
      ))}
    </div>
  );
}