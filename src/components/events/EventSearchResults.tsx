import EventGrid from './EventGrid';
import EventFilters from './EventFilters';
import { useEventSearch } from '../../hooks/useEventSearch';

export default function EventSearchResults() {
  const {
    filters,
    events,
    loading,
    error,
    hasMore,
    loadMore,
    updateFilters
  } = useEventSearch();

  return (
    <div className="space-y-6">
      <EventFilters filters={filters} onChange={updateFilters} />
      <EventGrid
        events={events}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
}