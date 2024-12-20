import { Search, MapPin, Calendar } from 'lucide-react';
import { SORT_OPTIONS, EVENT_CATEGORIES } from '../../config/api';

interface EventFiltersProps {
  filters: {
    keyword: string;
    location: string;
    category: string;
    sort: string;
  };
  onChange: (filters: any) => void;
}

export default function EventFilters({ filters, onChange }: EventFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Events
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
              placeholder="Search events..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
              placeholder="City or ZIP code"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value={EVENT_CATEGORIES.MUSIC}>Concerts</option>
            <option value={EVENT_CATEGORIES.THEATRE}>Theatre</option>
            <option value={EVENT_CATEGORIES.COMEDY}>Comedy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value={SORT_OPTIONS.DATE_ASC}>Date (Earliest)</option>
            <option value={SORT_OPTIONS.DATE_DESC}>Date (Latest)</option>
            <option value={SORT_OPTIONS.RELEVANCE}>Relevance</option>
            <option value={SORT_OPTIONS.NAME_ASC}>Name (A-Z)</option>
            <option value={SORT_OPTIONS.NAME_DESC}>Name (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
}