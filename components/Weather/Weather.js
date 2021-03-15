import { useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import Header from '../Header/Header';
import { getCityData } from '../../utils/userData.utils';
import styles from './Weather.module.scss';
import { getWeatherData } from '../../utils/weatherData.utils';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import { BREAKPOINTS } from '../../constants/sizes';
import useWinResize from '../../hooks/useWinResize';
import { UNITS } from '../../constants/units';

const Weather = (props) => {

    const [userData, setUserData] = useState(undefined);
    const [weatherData, setWeatherData] = useState();
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [selectedUnit, setSelectedUnit] = useState(UNITS.CELCIUS);
    const { width: winWidth } = useWinResize();

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

    const onUnitChange = (e) => {
        setSelectedUnit(e.target.value);
    }

    const isMobileView = winWidth < BREAKPOINTS.SMALL;

    return (
        <UserContext.Provider value={userData}>
            <div className={styles.weatherWrapper}>
                {userData?.city &&
                    <>
                        <div className={styles.innerContainer}>
                            <Header place={userData?.city} status={selectedItem?.weather?.[0]?.main ?? 'Looking Around...'} selectedUnit={selectedUnit} onUnitChange={onUnitChange} />
                            {weatherData && <WeatherDetails data={weatherData} setSelectedItem={setSelectedItem} selectedItem={selectedItem} mobileView={isMobileView} selectedUnit={selectedUnit} />}
                        </div>
                        {selectedItem &&
                            <div className={styles.backgroundImage} >
                                <img src={`http://openweathermap.org/img/wn/${selectedItem?.weather?.[0]?.icon ?? '02d'}@2x.png`} />
                            </div>
                        }
                    </>
                }
            </div>
        </UserContext.Provider>
    )
}

export default Weather;