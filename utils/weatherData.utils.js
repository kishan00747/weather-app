import Axios from "axios";
import { TIME_PERIODS } from "../constants/time";
import { OPEN_WEATHER_API } from "../constants/urls"

const transformForecastData = (data) => {
   return data.list.reduce((item, acc) => {
        const [day] = item.dt_txt.split(" ");
        if(!acc[TIME_PERIODS.DAILY][day]) {
            acc[TIME_PERIODS.DAILY][day] = item;
        }

        acc[TIME_PERIODS.HOURLY][item.dt_txt] = item;

        return acc;
   }, {
    ...data,
    [TIME_PERIODS.DAILY]: {},
    [TIME_PERIODS.HOURLY]: {}
   });
}

export const getWeatherData = async (lat, lon) => {

    const urlObj = new URL(OPEN_WEATHER_API);

    if (lat && lon && process.env.NEXT_PUBLIC_OW_KEY) {
        urlObj.searchParams.set('lat', lat);
        urlObj.searchParams.set('lon', lon);
        urlObj.searchParams.set('exclude', 'alerts,minutely');
        urlObj.searchParams.set('appid', process.env.NEXT_PUBLIC_OW_KEY);
        urlObj.searchParams.set('units', 'standard');
    }
    else {
        return null;
    }

    const url = urlObj.toString();

    let res;

    try {
        res = await Axios.get(url);
        return transformForecastData(res.data);
    }
    catch (e) {
        // console.error(e);
        return null;
    }
}