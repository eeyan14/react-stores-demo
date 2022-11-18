import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

import MonthWrapper from "./MonthWrapper";
import DayWrapper from "./DayWrapper";
import WeekWrapper from "./WeekWrapper";
import ReduxInfo from "./ReduxInfo";
import Calendar from "../views/Calendar";

const CalendarWrapper = () => {
    const dispatch = useDispatch();

    const { currentDate, view } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
            view: state.calendar.view,
        };
    });

    const getTitle = () => {
        const dateObj = DateTime.fromFormat(currentDate, "yyyy-LL-dd");
        let title = dateObj.toFormat("LLLL");
        if (view === "day") {
            title = dateObj.toFormat("LLLL d");
        } else if (view === "week") {
            // startOf / endOf goes to the nearest Monday / Saturday, so subtract 1
            // to view Sunday – Saturday
            const weekStart = dateObj.startOf("week").minus({ days: 1 });
            const weekEnd = dateObj.endOf("week").minus({ days: 1 });
            if (weekStart.toFormat("LLLL") !== weekEnd.toFormat("LLLL")) {
                title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                    "LLLL d"
                )}`;
            } else {
                title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                    "d"
                )}`;
            }
        }
        return title;
    };

    const setView = (view) => {
        dispatch({ type: "SET_VIEW", view: view });
    };

    const renderViews = () => {
        return (
            <>
                {view === "month" && <MonthWrapper />}
                {view === "day" && <DayWrapper />}
                {view === "week" && <WeekWrapper />}
            </>
        );
    };

    const renderSidebar = () => {
        return <ReduxInfo />;
    };

    const calendarTitle = getTitle();

    return (
        <Calendar
            calendarTitle={calendarTitle}
            renderViews={renderViews}
            renderSidebar={renderSidebar}
            view={view}
            setView={setView}
        />
    );
};

export default CalendarWrapper;
