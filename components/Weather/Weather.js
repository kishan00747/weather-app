import { useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import Header from '../Header/Header';
import { getCityData } from '../../utils/userData.utils';
import styles from './Weather.module.scss';
import { getWeatherData } from '../../utils/weatherData.utils';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

const Weather = (props) => {

    const [userData, setUserData] = useState(undefined);
    const [weatherData, setWeatherData] = useState();
    const [selectedItem, setSelectedItem] = useState(undefined);

    useEffect(async () => {
        let data = await getCityData();
        setUserData(data);
    }, []);

    useEffect(async () => {
        if (userData) {
            let data = await getWeatherData(userData.lat, userData.lon);
            setWeatherData(data);
        }
    }, [userData]);


    return (
        <UserContext.Provider value={userData}>
            <div className={styles.weatherWrapper}>
                {userData?.city &&
                    <div className={styles.innerContainer}>
                        <Header place={userData?.city} status={selectedItem?.weather?.[0]?.main ?? 'Looking Around...'} />
                        {weatherData && <WeatherDetails data={weatherData} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />}
                    </div>
                }
            </div>
        </UserContext.Provider>
    )
}

export default Weather;