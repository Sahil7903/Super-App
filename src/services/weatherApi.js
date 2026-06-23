import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = async (city = 'London') => {
  if (!API_KEY) {
    return {
      main: { temp: 24.5, humidity: 60, pressure: 1012 },
      wind: { speed: 3.2 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      name: city,
      mocked: true,
    };
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};
