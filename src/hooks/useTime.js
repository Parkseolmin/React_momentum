import { useState } from 'react';
import useInterval from './useInterval';

export const useTime = () => {
  const [time, setTime] = useState(() => new Date());
  useInterval(() => {
    setTime(new Date());
  }, 10000);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
    });
  };
  return formatTime(time);
};
