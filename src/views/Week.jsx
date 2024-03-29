import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DATE_FORMAT, formatEventStartEnd } from "../helpers";

import "../css/Week.css";

export const EVENT_WEEK_TESTID = "week-event-tile";
export const HEADER_WEEK_TESTID = "week-header-tile";

const Week = (props) => {
    const { currentDate, events, fetchEvents } = props;

    const [weekStart, setWeekStart] = useState(undefined); // DateTime
    const wdays = [0, 1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const dateObj = DateTime.fromFormat(currentDate, DATE_FORMAT);
        const weekStart = dateObj.startOf("week").minus({ days: 1 });
        setWeekStart(weekStart);
        const dates = [];
        for (let i = 0; i < 7; i++) {
            dates.push(weekStart.plus({ days: i }).toFormat(DATE_FORMAT));
        }
        fetchEvents(dates);
    }, [currentDate, fetchEvents]);

    const renderWeekHeader = (wday) => {
        const datetime = weekStart.plus({ days: wday });
        return (
            <div
                className={HEADER_WEEK_TESTID}
                key={wday}
                data-testid={HEADER_WEEK_TESTID}
            >
                <p>{datetime.toFormat("ccc")}</p>
                <p>{datetime.toFormat("d")}</p>
            </div>
        );
    };

    const renderEvents = (wday) => {
        const datetime = weekStart.plus({ days: wday });
        const date = datetime.toFormat(DATE_FORMAT);
        const eventsOnDate = events[date];
        return eventsOnDate?.map((event) => {
            const [startTime, endTime] = formatEventStartEnd(event);
            const key = `${event.start_hour}-${event.start_min}-${event.end_hour}-${event.end_min}`;
            return (
                <div
                    className={EVENT_WEEK_TESTID}
                    key={key}
                    data-testid={EVENT_WEEK_TESTID}
                >
                    <p>
                        <strong>{event.description}</strong>
                    </p>
                    <p className="time">
                        {startTime.toFormat("t")} — {endTime.toFormat("t")}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="week-view">
            <div className="week-header">
                {!!weekStart && wdays.map((wday) => renderWeekHeader(wday))}
            </div>

            <div className="week-events">
                {!!weekStart &&
                    wdays.map((wday) => {
                        return <div key={wday}>{renderEvents(wday)}</div>;
                    })}
            </div>
        </div>
    );
};

export default Week;
