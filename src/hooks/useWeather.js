import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { weatherIconMap } from 'data/weatherIcon';
import { useEffect, useState } from 'react';

export const useWeather = () => {
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
        },
        (error) => {
          console.error('Geolocation is not supported by this browser.', error);
        }
      );
    }
  }, []);

  const fetchWeather = async ({ queryKey }) => {
    const [{ lat, lon }] = queryKey;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await axios(url);
    return response.data;
  };

  const {
    data: weather,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [coords],
    queryFn: fetchWeather,
    enabled: !!coords,
    staleTime: 1000 * 60 * 60,
  });
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const weatherIconUrl = weather
    ? weatherIconMap[weather.weather[0].icon]
    : null;

  return {
    weather,
    error,
    isPending,
    isLoading,
    handleRefresh,
    weatherIconUrl,
  };
};
