import { useState } from 'react';
import useInterval from './useInterval';

export function useTimer(workMinutes, breakMinutes) {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);

  const playSound = () => {
    const sound = new Audio('/audio/Alarm.mp3');
    sound.play();
  };

  const tick = () => {
    setSecondsLeft((prevSeconds) => {
      if (prevSeconds === 0) {
        const nextMode = mode === 'work' ? 'break' : 'work';
        playSound();
        setMode(nextMode);
        return nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60;
      }
      return prevSeconds - 1;
    });
  };

  useInterval(tick, isPaused ? null : 1000);

  const togglePause = () => setIsPaused(!isPaused);

  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const innerPercentage = percentage / 2;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds =
    secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60;

  return {
    isPaused,
    togglePause,
    mode,
    minutes,
    seconds,
    percentage,
    innerPercentage,
  };
}
