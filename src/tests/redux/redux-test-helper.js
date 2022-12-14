import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import rootReducer from "../../redux/reducers";

export const defaultCalendarState = {
    view: "month",
    currentDate: "2022-12-01",
    events: {},
};

export function renderWithProviders(children, customCalendarState = {}) {
    const preloadedState = {
        calendar: {
            ...defaultCalendarState,
            ...customCalendarState,
        },
    };
    // for testing consistency, set initial redux state here
    const store = configureStore({ reducer: rootReducer, preloadedState });
    render(<Provider store={store}>{children}</Provider>);
    return { store };
}
