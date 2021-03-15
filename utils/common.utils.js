import moment from "moment"
import { TIME_PERIODS } from "../constants/time";
import { UNITS } from "../constants/units";

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

export const formatUnit = (val, unit) => {
    switch (unit) {
        case UNITS.CELCIUS: {
            return val - 273.15;
        }
        case UNITS.FAHRENHEIT: {
            return (val - 273.15) * (9 / 5) + 32;
        }
        default: {
            return val;
        }
    }
}

export const formatUnitAndRoundOff = (val, unit) => {
    return roundOff(formatUnit(val, unit));
} 