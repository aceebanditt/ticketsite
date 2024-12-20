import { Search, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface FilterState {
  keyword: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
  location: string;
  category: string;
  sort: string;
}

interface EventFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: '', max: '' },
    location: '',
    category: '',
    sort: 'date,asc'
  });

  const handleChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            className="pl-10 w-full rounded-full border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline-block h-4 w-4 mr-2" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleChange('dateRange', { ...filters.dateRange, start: e.target.value })}
              className="rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleChange('dateRange', { ...filters.dateRange, end: e.target.value })}
              className="rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline-block h-4 w-4 mr-2" />
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange.min}
              onChange={(e) => handleChange('priceRange', { ...filters.priceRange, min: e.target.value })}
              className="rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max}
              onChange={(e) => handleChange('priceRange', { ...filters.priceRange, max: e.target.value })}
              className="rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline-block h-4 w-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            placeholder="City or ZIP code"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
          />
        </div>

        {/* Category & Sort */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            >
              <option value="">All Categories</option>
              <option value="concerts">Concerts</option>
              <option value="sports">Sports</option>
              <option value="theater">Theater</option>
              <option value="comedy">Comedy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
              className="w-full rounded-md border-gray-300 focus:border-[#800020] focus:ring-[#800020]"
            >
              <option value="date,asc">Date (Earliest)</option>
              <option value="date,desc">Date (Latest)</option>
              <option value="price,asc">Price (Low to High)</option>
              <option value="price,desc">Price (High to Low)</option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}