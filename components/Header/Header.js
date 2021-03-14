import styles from './Header.module.scss';
const Header = (props) => {

    const { place, status } = props;

    return (
        <div className={styles.header}>
            <div className={styles.weatherStatus}>
                {status}
            </div>
            <div className={styles.cityBadge}>
                {place}
            </div>
        </div>
    )
}

export default Header;