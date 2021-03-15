import { useEffect, useState } from 'react';
import { TIME_PERIODS } from '../../constants/time';
import { formatUnitAndRoundOff } from '../../utils/common.utils';
import PeriodWiseData from './PeriodWiseData';
import TimePeriodSelector from './TimePeriodSelector';
import styles from './WeatherDetails.module.scss';

const WeatherDetails = (props) => {

    const { data, setSelectedItem, selectedItem, mobileView, selectedUnit } = props;
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(undefined);
    const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);

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
                    !mobileView
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
                                <Temperature temp={selectedItem?.temp?.day ?? selectedItem?.temp} unit={selectedUnit} />
                            </div>
                        </>
                        :
                        <>
                            <Temperature temp={selectedItem?.temp?.day ?? selectedItem?.temp} unit={selectedUnit} />
                            <div className={styles.weatherReport}>
                                <PeriodWiseData
                                    data={data?.[selectedTimePeriod]}
                                    onSelectItem={onSelectItem}
                                    selectedTimePeriod={selectedTimePeriod}
                                    selectedItemIndex={selectedItemIndex}
                                    selectedItem={selectedItem}
                                />
                            </div>
                            <TimePeriodSelector
                                onTimePeriodSelect={onTimePeriodSelect}
                                selectedTimePeriod={selectedTimePeriod}
                                data={data}
                            />
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
            <span className={styles.number}>{formatUnitAndRoundOff(temp, unit)}</span>
            <span className={styles.unit}>{'0' + unit}</span>
        </div>
    )
}

export default WeatherDetails;