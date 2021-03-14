import styles from './WeatherDetails.module.scss';
import { getFormattedDate, scrollbarVisible } from '../../utils/common.utils';
import { useEffect, useRef, useState } from 'react';

const PeriodWiseData = (props) => {

    const { data, selectedTimePeriod, selectedItemIndex, onSelectItem } = props;
    const [scrollbarPresent, setScrollbarPresent] = useState(false);

    const listRef = useRef(null);

    useEffect(() => {
        const scrollbarCheck = () => {
            if (listRef.current && scrollbarVisible(listRef.current)) {
                setScrollbarPresent(true);
            }
            else {
                setScrollbarPresent(false);
            }
        }

        scrollbarCheck();

        window.addEventListener('resize', scrollbarCheck);

        return () => {
            window.removeEventListener('resize', scrollbarCheck);
        }
    }, [data]);

    return (

        <ul ref={listRef} className={`${styles.weatherList} ${scrollbarPresent ? styles.scrollAdjust : ''}`}>
            {
                data.map((item, i) => (
                    <WeatherItem
                        key={item?.dt}
                        icon={item?.weather?.[0]?.icon ?? '02d'}
                        onClick={() => { onSelectItem(i) }}
                        selected={selectedItemIndex === i}
                        label={getFormattedDate(item?.dt * 1000, selectedTimePeriod)}
                    />
                ))
            }
        </ul>
    )
}

const WeatherItem = (props) => {

    const { icon, label, onClick = () => { }, selected } = props;

    const text = label.split('\n');

    return (
        <li className={`${styles.weatherItem} ${selected ? styles.selected : ''}`} onClick={onClick}>
            <div className={styles.weatherItem__icon}>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            </div>
            <div className={styles.weatherItem__label}>
                {text[0] && <span>{text[0]}</span>}
                {text[1] && <span>{text[1]}</span>}
            </div>
        </li>
    )
}

export default PeriodWiseData;