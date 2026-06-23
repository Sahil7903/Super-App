import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';
import TimerWidget from '../components/TimerWidget';
import NotesWidget from '../components/NotesWidget';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 text-white flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Profile, Weather, Timer) */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 bg-[#5746EA] rounded-[24px] p-6 h-auto min-h-[200px]">
             <UserProfile />
          </div>
          <div className="bg-[#101744] rounded-[24px] h-[150px] flex items-center justify-center p-4">
             <WeatherWidget />
          </div>
          <div className="bg-[#1E1E1E] rounded-[24px] p-6 flex-1 min-h-[250px]">
             <TimerWidget />
          </div>
        </div>

        {/* Center Column (Notes) */}
        <div className="bg-[#F1C75B] rounded-[24px] p-6 h-[500px] lg:h-auto min-h-[400px]">
           <NotesWidget />
        </div>

        {/* Right Column (News) */}
        <div className="bg-white rounded-[24px] overflow-hidden h-[500px] lg:h-auto">
           <NewsWidget />
        </div>

      </div>

      <div className="flex justify-end mt-8">
        <button 
          onClick={() => navigate('/movies')}
          className="bg-green-500 hover:bg-green-600 rounded-full px-10 py-3 font-bold transition-colors"
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
