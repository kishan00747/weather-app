import Axios from "axios"
import { LOCATION_API } from "../constants/urls"

export const getCityData = async () => {
    let res;
    try {
        res = await Axios.get(LOCATION_API);
        return res.data;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}