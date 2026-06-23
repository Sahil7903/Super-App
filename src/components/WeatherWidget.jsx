import React, { useEffect, useState } from 'react';
import { getWeather } from '../services/weatherApi';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather('London');
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <div className="text-white w-full text-center">Loading weather...</div>;
  if (error || !weather) return <div className="text-red-400 w-full text-center">Failed to load weather</div>;

  const dateObject = new Date();
  const dateStr = dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col w-full h-full text-white">
      <div className="flex items-center justify-around text-xl font-bold bg-[#E2315B] rounded-t-[20px] px-4 py-3 -mx-4 -mt-4 mb-4">
        <span>{dateStr}</span>
        <span>{timeStr}</span>
      </div>
      <div className="flex items-center justify-around flex-1 pb-2">
        <div className="flex flex-col items-center">
          <img 
            src={weather.mocked ? 'http://openweathermap.org/img/wn/01d@2x.png' : `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon"
            className="w-16 h-16 drop-shadow-md"
          />
          <span className="capitalize text-sm">{weather.weather[0].description}</span>
        </div>
        
        <div className="w-[2px] h-[50px] bg-white opacity-40"></div>
        
        <div className="flex flex-col items-center justify-center">
           <span className="text-[40px] font-bold leading-none mb-1">{Math.round(weather.main.temp)}°C</span>
           <span className="flex items-center gap-2 text-xs">
              <span className="text-white/80">🌪️</span> {weather.main.pressure} mbar
              <br/>Pressure
           </span>
        </div>
        
        <div className="w-[2px] h-[50px] bg-white opacity-40"></div>
        
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/80">💨</span> {weather.wind.speed} km/h Wind
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/80">💧</span> {weather.main.humidity}% Humidity
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
