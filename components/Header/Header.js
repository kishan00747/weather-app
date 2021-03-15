import { UNITS } from '../../constants/units';
import styles from './Header.module.scss';

const unitsArr = [
    { value: UNITS.FAHRENHEIT, label: '°F' },
    { value: UNITS.CELCIUS, label: '°C' },
]

const Header = (props) => {

    const { place, status, selectedUnit, onUnitChange } = props;

    return (
        <div className={styles.header}>
            <div className={styles.weatherStatus}>
                {status}
            </div>
            <div className={styles.infoPanel}>
                <div className={styles.cityBadge}>
                    {place}
                </div>
                <div className={styles.switch}>
                    {
                        unitsArr.map(item => (
                            <div className={styles.switchItem} data-checked={selectedUnit === item.value} key={item.value}>
                                <input type="radio" id={'radio_' + item.value} name={"unit"} value={item.value} onChange={onUnitChange} defaultChecked={selectedUnit === item.value} />
                                <label htmlFor={"radio_" + item.value}>{item.label}</label>
                            </div>
                        ))
                    }
                    <div className={styles.slider}></div>
                </div>
            </div>

        </div>
    )
}

export default Header;