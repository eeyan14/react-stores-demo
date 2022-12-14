import { render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CalendarStore from "../../mobx/CalendarStore";
import MobXInfo from "../../mobx/MobXInfo";
import {
    CURRENT_STORE_TESTID,
    HISTORY_EVENT_TESTID,
} from "../../views/StoreInfo";

describe("mobx/MobXInfo", () => {
    const INITIAL_EVENTS_COUNT = 3;
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("renders initial state", () => {
        render(<MobXInfo store={store} />);
        const storeSection = screen.getByTestId(CURRENT_STORE_TESTID);
        expect(screen.getByText("Store")).toBeVisible();
        expect(within(storeSection).getByText("view")).toBeVisible();
        expect(within(storeSection).getByText("currentDate")).toBeVisible();
        expect(within(storeSection).getByText("events")).toBeVisible();
    });

    test("displayed state is updated", () => {
        render(<MobXInfo store={store} />);
        const storeSection = screen.getByTestId(CURRENT_STORE_TESTID);
        act(() => store.setView("day"));
        expect(within(storeSection).getByText('"day"')).toBeVisible();
    });

    test("renders initial events", () => {
        render(<MobXInfo store={store} />);
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT);
    });

    test("renders new event when view changes", async () => {
        render(<MobXInfo store={store} />);
        act(() => store.setView("day"));
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });

    test("renders new event when currentDate changes", async () => {
        render(<MobXInfo store={store} />);
        act(() => store.setCurrentDate("2022-12-02"));
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });

    test("renders new event when events changes", async () => {
        render(<MobXInfo store={store} />);
        act(() => store.setEvents({ "2022-12-01": [] }));
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });
});
