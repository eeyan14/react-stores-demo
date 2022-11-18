import React from "react";
import { observer } from "mobx-react-lite";

import MonthWrapper from "./MonthWrapper";
import DayWrapper from "./DayWrapper";
import WeekWrapper from "./WeekWrapper";
import MobXInfo from "./MobXInfo";
import Calendar from "../views/Calendar";

const CalendarWrapper = observer((props) => {
    const { view, calendarTitle, setView } = props.store;

    const renderViews = () => {
        return (
            <>
                {view === "month" && <MonthWrapper store={props.store} />}
                {view === "day" && <DayWrapper store={props.store} />}
                {view === "week" && <WeekWrapper store={props.store} />}
            </>
        );
    };

    const renderSidebar = () => {
        return <MobXInfo store={props.store} />;
    };

    return (
        <Calendar
            calendarTitle={calendarTitle}
            renderViews={renderViews}
            renderSidebar={renderSidebar}
            view={view}
            setView={setView}
        />
    );
});

export default CalendarWrapper;
