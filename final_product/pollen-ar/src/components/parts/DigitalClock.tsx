import { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
      });
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!time.hours) return null;

  return (
    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-white/50 shadow-md px-3 py-1 rounded-lg text-slate-800 pointer-events-none">
      <svg
        className="w-5 h-5 text-blue-600 opacity-90"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="font-mono font-bold tracking-wider flex items-baseline">
        <span className="text-xl">
          {time.hours}:{time.minutes}
        </span>
        <span className="text-xs font-semibold text-slate-600 ml-1 mb-[2px]">
          {time.seconds}
        </span>
      </div>
    </div>
  );
}
