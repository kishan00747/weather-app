import moment from "moment"
import { TIME_PERIODS } from "../constants/time";

export const getFormattedDate = (timeInMs, timePeriod) => {
    const date = moment(timeInMs);
    switch (timePeriod) {
        case TIME_PERIODS.DAILY: {
            return date.format('ddd');
        }
        case TIME_PERIODS.HOURLY: {
            return `${date.format("ddd")}\n${date.format("hha")}`
        }
    }
}

export const roundOff = (val) => {
    return Math.round(val);
}

export const scrollbarVisible = (element) => {
    return element.scrollWidth > element.clientWidth;
}