import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import { SettingsContext } from 'context/SettingsContext';
import SettingButton from '../SettingButton/SettingButton';
import PlayButton from '../PlayButton/PlayButton';
import PauseButton from '../PauseButton/PauseButton';
import styles from './Timer.module.css';
import { useOptionContext } from 'context/OptionContext';
import Arrow from 'components/Arrow/Arrow';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useTimer } from 'hooks/useTimer';

const red = 'rgba(88, 187, 211, 0.8)';
const green = 'rgba(34, 187, 140, 0.85)';

export default function Timer() {
  const { workMinutes, breakMinutes, setShowSettings } =
    useContext(SettingsContext);
  const Timer = useTimer(workMinutes, breakMinutes);
  const { showItemBox, setShowItemBox, itemBoxRef, clockRef } =
    useOptionContext();
  const location = useLocation();

  return (
    <div className={styles.progressBox} ref={clockRef}>
      <span
        className={styles.changeArrow}
        onClick={() => setShowItemBox(!showItemBox)}
      >
        <FaArrowRightArrowLeft />
      </span>
      {showItemBox && (
        <Arrow location={location} itemBoxRef={itemBoxRef} styles={styles} />
      )}
      <CircularProgressbarWithChildren
        value={Timer.percentage}
        text={`${Timer.minutes}:${Timer.seconds}`}
        styles={buildStyles({
          textColor: '#fff',
          pathColor: Timer.mode === 'work' ? red : green,
          trailColor: 'transparent',
        })}
        className={
          Timer.Timermode === 'work'
            ? `${styles.circularProgressbarWorkMode}`
            : `${styles.circularProgressbarBreakMode}`
        }
      >
        <div
          style={{
            width: '84%',
          }}
        >
          <CircularProgressbar
            value={Timer.innerPercentage}
            styles={buildStyles({
              pathColor: Timer.mode === 'work' ? red : green,
              trailColor: 'transparent',
            })}
            className={
              Timer.mode === 'work'
                ? `${styles.circularProgressbarWorkMode}`
                : `${styles.circularProgressbarBreakMode}`
            }
          />
        </div>
        <div style={{ marginTop: '20px' }} className={styles.btnbox}>
          {Timer.isPaused ? (
            <PlayButton onClick={Timer.togglePause} />
          ) : (
            <PauseButton onClick={Timer.togglePause} />
          )}
        </div>
      </CircularProgressbarWithChildren>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <SettingButton onClick={() => setShowSettings(true)} />
      </div>
    </div>
  );
}
