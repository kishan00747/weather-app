import styles from './WeatherDetails.module.scss';
import { getFormattedDate } from '../../utils/common.utils';

const PeriodWiseData = (props) => {

    const { data, selectedTimePeriod, selectedItemIndex, onSelectItem } = props;
    return (

        <ul className={styles.weatherList}>
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
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
            </div>
            <div className={styles.weatherItem__label}>
                {text[0] && <span>{text[0]}</span>}
                {text[1] && <span>{text[1]}</span>}
            </div>
        </li>
    )
}

export default PeriodWiseData;