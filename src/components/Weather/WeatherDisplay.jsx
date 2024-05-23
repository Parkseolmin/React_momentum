import { weatherIconMap } from 'data/weatherIcon';
import { useEffect, useState } from 'react';
import styles from './WeatherDisplay.module.css';
import Loading from 'components/Loading/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function WeatherDisplay() {
  const [coords, setCoords] = useState(null);
  const client = useQueryClient();

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&lang=kr&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Fetching weather data failed');
    }
    return response.json();
  };

  const {
    data: weather,
    error,
    isPending,
  } = useQuery({
    queryKey: [coords],
    queryFn: fetchWeather,
    enabled: !!coords, // 쿼리가 좌표가 설정된 후에만 실행되도록 함
    staleTime: 1000 * 60 * 60,
  });

  if (isPending) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!weather) return <p>No weather data available.</p>;

  const weatherIconUrl = weatherIconMap[weather.weather[0].icon];

  return (
    <section
      className={styles.weatherInfo}
      onClick={() => {
        client.invalidateQueries({ queryKey: [coords] });
      }}
    >
      <div className={styles.iconTmp}>
        <span>
          {weatherIconUrl && <img src={weatherIconUrl} alt='Weather icon' />}
        </span>
        <p className={styles.temp}>{Math.floor(weather.main.temp)}°</p>
      </div>
      <p className={styles.weatherName}>{weather.name}</p>
    </section>
  );
}
