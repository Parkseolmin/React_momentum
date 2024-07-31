import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BsPencil } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import { VscRobot } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import WeatherDisplay from 'components/Weather/WeatherDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function Navbar() {
  return (
    <header>
      <nav className={styles.header__wrap}>
        <div className={styles.header__left}>
          <Link to={'/'} aria-label='home'>
            <IoHomeOutline />
          </Link>
          <Link to={'/todo'} aria-label='todo'>
            <BsPencil />
          </Link>
          <Link to={'/pomodoro'} aria-label='pomodoro'>
            <IoMdTimer />
          </Link>
          <Link to={'/gpt'} aria-label='gpt'>
            <VscRobot />
          </Link>
        </div>
        <div className={styles.header__right}>
          <QueryClientProvider client={queryClient}>
            <WeatherDisplay />
          </QueryClientProvider>
        </div>
      </nav>
    </header>
  );
}
