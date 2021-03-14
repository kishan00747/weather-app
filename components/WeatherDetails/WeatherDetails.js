import { useEffect, useState } from 'react';
import { TIME_PERIODS } from '../../constants/time';
import { BREAKPOINTS } from '../../constants/sizes';
import useWinResize from '../../hooks/useWinResize';
import { roundOff } from '../../utils/common.utils';
import PeriodWiseData from './PeriodWiseData';
import TimePeriodSelector from './TimePeriodSelector';
import styles from './WeatherDetails.module.scss';

const WeatherDetails = (props) => {

    const { data, setSelectedItem, selectedItem } = props;
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(undefined);
    const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);
    const { width: winWidth } = useWinResize();

    useEffect(() => {
        if (data && selectedTimePeriod && selectedItemIndex !== undefined) {
            setSelectedItem(data?.[selectedTimePeriod]?.[selectedItemIndex]);
        }
        else if (data) {
            setSelectedTimePeriod(TIME_PERIODS.DAILY);
            setSelectedItemIndex(0);
        }
    }, [data, selectedTimePeriod, selectedItemIndex])

    const onTimePeriodSelect = (e) => {
        let timePeriod = e.target.dataset.val;
        setSelectedTimePeriod(timePeriod);
        setSelectedItemIndex(0);
    }

    const onSelectItem = (index) => {
        setSelectedItemIndex(index);
    }

    return (
        <div className={styles.weatherDetails}>
            {
                data && selectedTimePeriod && selectedItem
                    ?
                    winWidth > BREAKPOINTS.SMALL
                        ?
                        <>
                            <TimePeriodSelector
                                onTimePeriodSelect={onTimePeriodSelect}
                                selectedTimePeriod={selectedTimePeriod}
                                data={data}
                            />
                            <div className={styles.weatherReport}>
                                <PeriodWiseData
                                    data={data?.[selectedTimePeriod]}
                                    onSelectItem={onSelectItem}
                                    selectedTimePeriod={selectedTimePeriod}
                                    selectedItemIndex={selectedItemIndex}
                                    selectedItem={selectedItem}
                                />
                                <Temperature temp={selectedItem?.temp?.day ?? selectedItem?.temp} unit={'0C'} />
                            </div>
                        </>
                        :
                        <>
                            <Temperature temp={selectedItem?.temp?.day ?? selectedItem?.temp} unit={'0C'} />
                            <TimePeriodSelector
                                onTimePeriodSelect={onTimePeriodSelect}
                                selectedTimePeriod={selectedTimePeriod}
                                data={data}
                            />
                            <div className={styles.weatherReport}>
                                <PeriodWiseData
                                    data={data?.[selectedTimePeriod]}
                                    onSelectItem={onSelectItem}
                                    selectedTimePeriod={selectedTimePeriod}
                                    selectedItemIndex={selectedItemIndex}
                                    selectedItem={selectedItem}
                                />

                            </div>
                        </>
                    :
                    null

            }


        </div>
    )
}

const Temperature = (props) => {
    const { temp, unit } = props;

    return (
        <div className={styles.temperature}>
            <span className={styles.number}>{roundOff(temp)}</span>
            <span className={styles.unit}>{unit}</span>
        </div>
    )
}

export default WeatherDetails;