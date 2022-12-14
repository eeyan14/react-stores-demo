import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DATE_FORMAT } from "../helpers";

import "../css/Month.css";

export const DAY_BUTTON_TESTID = "day-button";
export const DAY_BUTTON_SELECTED_TESTID = "day-button-selected";

const Month = (props) => {
    const { currentDate, setCurrentDate } = props;

    const [calendarHeight, _setCalendarHeight] = useState(null);
    const setCalendarHeight = () => {
        const calendarContainer = document.getElementById("calendar-container");
        if (calendarContainer) {
            _setCalendarHeight(calendarContainer.clientHeight);
        }
    };

    useEffect(() => {
        /**
         * When window event listener detects a resize change, update height
         * of calendar container
         */
        window.addEventListener("resize", setCalendarHeight);
        return () => {
            window.removeEventListener("resize", setCalendarHeight);
        };
    }, []);

    const renderDay = (datetime) => {
        let clazzName = "day";
        const date = datetime.toFormat(DATE_FORMAT);
        if (currentDate === date) {
            clazzName += " selected";
        }

        let buttonSize = "5rem";
        if (calendarHeight) {
            buttonSize = `calc(${calendarHeight}px / 7 - 0.5rem)`;
        }

        return (
            <button
                data-testid={DAY_BUTTON_TESTID}
                key={datetime.day}
                className={clazzName}
                style={{ width: buttonSize, height: buttonSize }}
                onClick={() => setCurrentDate(date)}
            >
                {datetime.day}
            </button>
        );
    };

    const renderDays = () => {
        const dateObj = DateTime.fromFormat(currentDate, DATE_FORMAT);
        const numDaysInMonth = dateObj.endOf("month").day;
        let firstDayOfMonth = dateObj.startOf("month");
        const daysArr = [];

        // push empty components to offset months not starting on Sundays
        const weekday = firstDayOfMonth.weekday;
        if (weekday < 7) {
            // 7 is Sunday, no need to offset
            let offset = 0;
            while (offset < weekday) {
                daysArr.push(<div key={`offset-${offset}`} />);
                offset += 1;
            }
        }

        // push day components
        for (let i = 1; i <= numDaysInMonth; i++) {
            const datetime = firstDayOfMonth.plus({ days: i - 1 });
            daysArr.push(renderDay(datetime));
        }

        return daysArr.map((dayComponent) => {
            return dayComponent;
        });
    };

    return <div className="month-view">{renderDays()}</div>;
};

export default Month;
