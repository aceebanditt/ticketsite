interface LocationData {
  city: string;
  region: string;
  country: string;
  coords: {
    lat: number;
    lon: number;
  };
  timezone: string;
}

export async function getLocationByIP(): Promise<LocationData> {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  
  return {
    city: data.city,
    region: data.region,
    country: data.country_name,
    coords: {
      lat: data.latitude,
      lon: data.longitude
    },
    timezone: data.timezone
  };
}