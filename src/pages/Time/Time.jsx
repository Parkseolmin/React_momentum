import styles from './Time.module.css';
import Search from 'components/Search/Search';
import { useTime } from 'hooks/useTime';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import Arrow from 'components/Arrow/Arrow';
import { useOptionContext } from 'context/OptionContext';
import FamousSaying from 'components/FamousSaying/FamousSaying';

export default function Time() {
  const time = useTime();
  const location = useLocation();
  const { showItemBox, setShowItemBox, itemBoxRef, clockRef } =
    useOptionContext();

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock} ref={clockRef}>
        <span
          className={styles.changeArrow}
          onClick={() => setShowItemBox(!showItemBox)}
        >
          <FaArrowRightArrowLeft />
        </span>
        {showItemBox && (
          <Arrow location={location} itemBoxRef={itemBoxRef} styles={styles} />
        )}
        {time}
      </div>
      <FamousSaying />
      <Search />
    </div>
  );
}
