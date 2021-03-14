import Axios from "axios";
import { OPEN_WEATHER_API } from "../constants/urls"


export const getWeatherData = async (lat, lon) => {

    const urlObj = new URL(OPEN_WEATHER_API);

    if (lat && lon && process.env.NEXT_PUBLIC_OW_KEY) {
        urlObj.searchParams.set('lat', lat);
        urlObj.searchParams.set('lon', lon);
        urlObj.searchParams.set('exclude', 'alerts,minutely');
        urlObj.searchParams.set('appid', process.env.NEXT_PUBLIC_OW_KEY);
        urlObj.searchParams.set('units', 'metric');
    }
    else {
        return null;
    }

    const url = urlObj.toString();

    let res;

    try {
        res = await Axios.get(url);
        return res.data;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}