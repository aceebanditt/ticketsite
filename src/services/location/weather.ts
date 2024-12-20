interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

export async function getWeather(coords: { lat: number; lon: number }): Promise<WeatherData> {
  const API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with actual API key
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  };
}