import styles from './WeatherDisplay.module.css';
import Loading from 'components/Loading/Loading';
import { useWeather } from 'hooks/useWeather';
import SubDisplay from './SubDisplay';

export default function WeatherDisplay() {
  const {
    weather,
    error,
    isPending,
    isLoading,
    handleRefresh,
    weatherIconUrl,
  } = useWeather();

  if (isPending || isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!weather) return <p>No weather data available.</p>;
  return (
    <section className={styles.weatherInfo} onClick={handleRefresh}>
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
