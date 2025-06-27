'use client';
import { useEffect, useState } from 'react';

const getRemainingTime = () => {
  const now = new Date();
  const hackweekEnd = new Date('2025-06-29T23:59:59');
  const diff = Math.max(0, Math.floor((hackweekEnd - now) / 1000));

  const days = Math.floor(diff / (24 * 60 * 60));
  const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = diff % 60;

  return { days, hours, minutes, seconds, isOver: diff <= 0 };
};

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getRemainingTime();
      setRemaining(time);
      if (time.isOver) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remaining.isOver) {
    return (
      <div className="text-center text-3xl font-bold text-red-600 p-6">
        Hackweek has ended!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
      <TimeBox value={remaining.days} label="Days" />
      <Colon />
      <TimeBox value={remaining.hours} label="Hours" />
      <Colon />
      <TimeBox value={remaining.minutes} label="Minutes" />
      <Colon />
      <TimeBox value={remaining.seconds} label="Seconds" />
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
      <div className="text-sm text-blue-100">{label}</div>
    </div>
  );
}

function Colon() {
  return <div className="text-2xl font-bold text-white">:</div>;
}
