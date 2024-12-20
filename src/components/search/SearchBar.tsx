import { useState, useRef, useEffect } from 'react';
import { Search, X, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDebounce } from '../../hooks/useDebounce';
import { eventService } from '../../services/api/events';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useClickOutside(searchRef, () => setShowSuggestions(false));

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await eventService.getEvents({ keyword: debouncedQuery, size: 5 });
        setSuggestions(response.events);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/events?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 
                     focus:border-[--primary] focus:ring-2 focus:ring-[--primary] focus:ring-opacity-50
                     placeholder-gray-400 bg-white shadow-sm"
            placeholder="Search events, venues, or artists..."
            aria-label="Search"
            aria-expanded={showSuggestions}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.length >= 2) && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg 
                     border border-gray-200 max-h-96 overflow-y-auto z-50"
          role="listbox"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((event) => (
                <li key={event.id}>
                  <button
                    onClick={() => {
                      navigate(`/event/${event.id}`);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-4 text-left"
                    role="option"
                  >
                    <img
                      src={event.images?.[0]?.url}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{event.name}</p>
                      <div className="mt-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(event.dates.start.dateTime).toLocaleDateString()}</span>
                        </div>
                        {event._embedded?.venues?.[0] && (
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event._embedded.venues[0].name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}