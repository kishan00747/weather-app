import { useMemo } from 'react';
import { TIME_PERIODS } from '../../constants/time';
import styles from './WeatherDetails.module.scss';

const timePeriods = [
    { key: TIME_PERIODS.DAILY, label: 'D' },
    { key: TIME_PERIODS.HOURLY, label: 'H' },
]

const TimePeriodSelector = (props) => {

    const { data, onTimePeriodSelect = () => { }, selectedTimePeriod } = props;
    const timePeriodsArr = useMemo(() => {
        if (!data) {
            return [];
        }

        return timePeriods.reduce((acc, item) => {
            if (item.key in data) {
                acc.push({
                    ...item
                });
            }

            return acc;
        }, [])

    }, [data]);

    return (
        <ul className={styles.timePeriodSelector}>
            {
                timePeriodsArr.map(item => (
                    <li
                        key={item.key}
                        data-val={item.key}
                        className={`${styles.timePeriodItem} ${selectedTimePeriod === item.key ? styles.selected : ''}`}
                        onClick={onTimePeriodSelect}
                    >
                        {item.label}
                    </li>
                ))
            }
        </ul>
    )
}

export default TimePeriodSelector;