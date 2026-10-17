import { useState, useEffect } from 'react';

export interface CountdownValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
}

/**
 * Real-time countdown engine calculating duration until doors opening.
 *
 * @param targetDate - ISO date string or Date object representing the event opening.
 * @returns Formatted two-digit time remaining metrics and completion status.
 */
export const useCountdown = (targetDate: string | Date): CountdownValues => {
  const calculateTimeRemaining = (): CountdownValues => {
    const destination = new Date(targetDate).getTime();
    const now = Date.now();
    const difference = destination - now;

    if (difference <= 0 || isNaN(destination)) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        isComplete: true,
      };
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const m = Math.floor((difference / 1000 / 60) % 60);
    const s = Math.floor((difference / 1000) % 60);

    return {
      days: d.toString().padStart(2, '0'),
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
