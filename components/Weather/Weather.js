import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { getCityData } from '../../utils/userData.utils';
import styles from './Weather.module.scss';

const Weather = (props) => {

    const [userData, setUserData] = useState({});

    useEffect(async () => {
        let data = await getCityData();
        setUserData(data);
    }, [])


    return (
        <UserContext.Provider value={userData}>
            <div className={styles.weatherWrapper}>
                {userData.city &&
                    <div className={styles.cityBadge}>
                        {userData.city}
                    </div>
                }
            </div>
        </UserContext.Provider>
    )
}

export default Weather;