import React, { useCallback, useState } from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { Switch } from 'devextreme-react/switch';
import { NumberBox } from 'devextreme-react/number-box';

const currentDate = new Date();
const views = ['day', 'week', 'month'];

const onContentReady = (e) => {
    e.component.scrollTo(new Date());
};
const onAppointmentClick = (e) => {
    e.cancel = true;
};
const onAppointmentDblClick = (e) => {
    e.cancel = true;
};
const App = () => {
    const [showCurrentTimeIndicator, setShowCurrentTimeIndicator] = useState(true);
    const [shadeUntilCurrentTime, setShadeUntilCurrentTime] = useState(true);
    const [updateInterval, setUpdateInterval] = useState(10);
    const onShowCurrentTimeIndicatorChanged = useCallback((e) => {
        setShowCurrentTimeIndicator(e.value);
    }, []);
    const onShadeUntilCurrentTimeChanged = useCallback((e) => {
        setShadeUntilCurrentTime(e.value);
    }, []);
    const onUpdateIntervalChanged = useCallback((e) => {
        setUpdateInterval(e.value);
    }, []);
    return (
        <React.Fragment>
            <Scheduler
                locale="pt-BR"
                views={views}
                defaultCurrentView="week"
                showCurrentTimeIndicator={showCurrentTimeIndicator}
                indicatorUpdateInterval={updateInterval * 1000}
                showAllDayPanel={false}
                shadeUntilCurrentTime={shadeUntilCurrentTime}
                defaultCurrentDate={currentDate}
                editing={false}
                height={600}
                onContentReady={onContentReady}
                onAppointmentClick={onAppointmentClick}
                onAppointmentDblClick={onAppointmentDblClick}
            >
            </Scheduler>    </React.Fragment>
    );
};
export default App;
