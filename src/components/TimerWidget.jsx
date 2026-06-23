import React, { useState, useEffect, useRef } from 'react';

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const [remainingTime, setRemainingTime] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const totalTimeRef = useRef(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(time => time - 1);
      }, 1000);
    } else if (remainingTime === 0 && isActive) {
      setIsActive(false);
      setIsPaused(false);
      clearInterval(interval);
      playAlert();
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, remainingTime]);

  const playAlert = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1);
      }
    } catch(e) {
      console.log('Audio playback blocked');
    }
  };

  const handleStart = () => {
    const total = (hours * 3600) + (minutes * 60) + seconds;
    if (total > 0) {
      totalTimeRef.current = total;
      setRemainingTime(total);
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const dHours = Math.floor(remainingTime / 3600);
  const dMinutes = Math.floor((remainingTime % 3600) / 60);
  const dSeconds = remainingTime % 60;

  const percentage = isActive ? (remainingTime / totalTimeRef.current) * 100 : 0;
  
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isActive ? circumference - (percentage / 100) * circumference : 0;

  const formatTime = (v) => v < 10 ? `0${v}` : v;

  const increment = (setter, limit, current) => {
    if(isActive) return;
    setter(current >= limit ? 0 : current + 1);
  }
  const decrement = (setter, limit, current) => {
    if(isActive) return;
    setter(current <= 0 ? limit : current - 1);
  }

  return (
    <div className="flex flex-col md:flex-row text-white w-full h-full rounded-[24px]">
      
      {/* Left side Circle */}
      <div className="flex-1 flex justify-center items-center bg-[#191e39] m-2 rounded-full max-w-[200px] max-h-[200px] self-center drop-shadow-2xl shadow-[#ff6a6a]/20">
         <div className="relative w-44 h-44 flex items-center justify-center">
           <svg className="w-44 h-44 transform -rotate-90 absolute">
             {/* Back circle */}
             <circle 
               cx="88" cy="88" r={radius} 
               stroke="#191e39" strokeWidth="8" fill="transparent"
             />
             {/* Progress circle */}
             <circle 
               cx="88" cy="88" r={radius} 
               stroke="#FF6A6A" 
               strokeWidth="8" 
               fill="transparent"
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
               className="transition-all duration-1000 ease-linear shadow-[0_0_15px_#FF6A6A]"
               style={{ filter: 'drop-shadow(0px 0px 5px rgba(255, 106, 106, 0.8))' }}
             />
           </svg>
           <div className="z-10 flex items-center justify-center text-[34px] font-bold">
              {formatTime(dHours)}:{formatTime(dMinutes)}:{formatTime(dSeconds)}
           </div>
         </div>
      </div>
      
      {/* Right side Controls */}
      <div className="flex-2 flex flex-col justify-center items-center gap-6 mt-6 md:mt-0 md:ml-4">
        
        {/* Setters */}
        <div className="flex gap-4">
           {/* Hours */}
           <div className="flex flex-col items-center">
             <span className="text-[#949494] font-bold text-sm mb-2">Hours</span>
             <button onClick={() => increment(setHours, 23, hours)} className="mb-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-b-[#949494] border-transparent cursor-pointer hover:border-b-white transition-colors"></button>
             <span className="text-[40px] font-bold">{formatTime(hours)}</span>
             <button onClick={() => decrement(setHours, 23, hours)} className="mt-2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-t-[#949494] border-transparent cursor-pointer hover:border-t-white transition-colors"></button>
           </div>
           
           <div className="flex flex-col items-center justify-center mt-6 text-[40px] font-bold">:</div>

           {/* Minutes */}
           <div className="flex flex-col items-center">
             <span className="text-[#949494] font-bold text-sm mb-2">Minutes</span>
             <button onClick={() => increment(setMinutes, 59, minutes)} className="mb-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-b-[#949494] border-transparent cursor-pointer hover:border-b-white transition-colors"></button>
             <span className="text-[40px] font-bold">{formatTime(minutes)}</span>
             <button onClick={() => decrement(setMinutes, 59, minutes)} className="mt-2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-t-[#949494] border-transparent cursor-pointer hover:border-t-white transition-colors"></button>
           </div>

           <div className="flex flex-col items-center justify-center mt-6 text-[40px] font-bold">:</div>

           {/* Seconds */}
           <div className="flex flex-col items-center">
             <span className="text-[#949494] font-bold text-sm mb-2">Seconds</span>
             <button onClick={() => increment(setSeconds, 59, seconds)} className="mb-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-b-[#949494] border-transparent cursor-pointer hover:border-b-white transition-colors"></button>
             <span className="text-[40px] font-bold">{formatTime(seconds)}</span>
             <button onClick={() => decrement(setSeconds, 59, seconds)} className="mt-2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-t-[#949494] border-transparent cursor-pointer hover:border-t-white transition-colors"></button>
           </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center w-full justify-around mt-4">
          <button 
             onClick={isActive ? (isPaused ? handleResume : handlePause) : handleStart}
             className="bg-[#FF6A6A] hover:bg-[#ff5555] text-white px-12 py-2 rounded-full font-bold transition-all text-xl"
           >
             {isActive ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
           </button>

           {isActive && (
             <button 
               onClick={handleReset}
               className="border border-[#FF6A6A] text-[#FF6A6A] hover:bg-[#FF6A6A] hover:text-white px-6 py-2 rounded-full font-bold transition-all text-base"
             >
               Reset
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
