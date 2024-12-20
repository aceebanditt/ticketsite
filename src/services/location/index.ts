import { getLocationByIP } from './ipLocation';
import { getWeather } from './weather';

export const locationService = {
  async getUserLocation() {
    try {
      const location = await getLocationByIP();
      const weather = await getWeather(location.coords);
      
      return {
        ...location,
        weather
      };
    } catch (error) {
      console.error('Error getting user location:', error);
      return null;
    }
  }
};