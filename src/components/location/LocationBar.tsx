import { useState, useEffect } from 'react';
import { MapPin, Clock, Sun } from 'lucide-react';
import { locationService } from '../../services/location';

export default function LocationBar() {
  const [locationData, setLocationData] = useState<any>(null);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const loadLocation = async () => {
      const data = await locationService.getUserLocation();
      setLocationData(data);
    };

    loadLocation();
  }, []);

  useEffect(() => {
    if (!locationData?.timezone) return;

    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: locationData.timezone,
        hour: 'numeric',
        minute: '2-digit'
      });
      setLocalTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [locationData?.timezone]);

  if (!locationData) return null;

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{locationData.city}, {locationData.region}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{localTime}</span>
            </div>

            {locationData.weather && (
              <div className="flex items-center">
                <Sun className="h-4 w-4 mr-1" />
                <span>{locationData.weather.temp}°C</span>
                <img 
                  src={locationData.weather.icon} 
                  alt={locationData.weather.condition}
                  className="h-6 w-6 ml-1"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <select className="text-sm border-none bg-transparent">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

            <select className="text-sm border-none bg-transparent">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}