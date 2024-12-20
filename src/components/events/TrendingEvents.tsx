import { useTrendingEvents } from '../../hooks/useEvents';
import EventSlider from './EventSlider';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function TrendingEvents() {
  const { events, loading, error } = useTrendingEvents();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Events</h2>
      <EventSlider events={events} />
    </div>
  );
}