import { Calendar, SlidersHorizontal, DollarSign, MapPin, Users } from 'lucide-react';

interface Genre {
  id: string;
  name: string;
}

interface CategoryFiltersProps {
  filters: {
    sort: string;
    genreId: string;
    startDate: string;
    endDate: string;
    priceRange?: string;
    city?: string;
    ageGroup?: string;
  };
  onChange: (filters: any) => void;
  genres: Genre[];
  showPriceRange?: boolean;
  showLocationFilter?: boolean;
  showAgeRestriction?: boolean;
  showAgeGroups?: boolean;
  showFamilyFeatures?: boolean;
}

export default function CategoryFilters({
  filters,
  onChange,
  genres,
  showPriceRange,
  showLocationFilter,
  showAgeRestriction,
  showAgeGroups,
  showFamilyFeatures
}: CategoryFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.genreId}
            onChange={(e) => onChange({ ...filters, genreId: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="date,asc">Date (Earliest)</option>
            <option value="date,desc">Date (Latest)</option>
            <option value="name,asc">Name (A-Z)</option>
            <option value="name,desc">Name (Z-A)</option>
            <option value="relevance,desc">Popularity</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </div>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {showPriceRange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Price Range</span>
              </div>
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => onChange({ ...filters, priceRange: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Any Price</option>
              <option value="0-25">Under $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100+">$100+</option>
            </select>
          </div>
        )}

        {showLocationFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
            </label>
            <input
              type="text"
              placeholder="City or ZIP code"
              value={filters.city}
              onChange={(e) => onChange({ ...filters, city: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}

        {showAgeGroups && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Age Group</span>
              </div>
            </label>
            <select
              value={filters.ageGroup}
              onChange={(e) => onChange({ ...filters, ageGroup: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Ages</option>
              <option value="0-3">0-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8-12">8-12 years</option>
              <option value="13+">13+ years</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}