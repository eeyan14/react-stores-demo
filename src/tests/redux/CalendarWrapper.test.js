import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./redux-test-helper";
import CalendarWrapper from "../../redux/CalendarWrapper";

describe("redux/CalendarWrapper", () => {
    test("renders calendar", () => {
        renderWithProviders(<CalendarWrapper />);
        expect(screen.getByText("DECEMBER")).toBeVisible();
    });

    test("clicking 'month' option changes to month view", () => {
        renderWithProviders(<CalendarWrapper />, { view: "day" });
        const button = screen.getByRole("button", { name: "Month" });
        userEvent.click(button);
        expect(screen.getByText("DECEMBER")).toBeVisible();
    });

    test("clicking 'day' option changes to day view", () => {
        renderWithProviders(<CalendarWrapper />);
        const button = screen.getByRole("button", { name: "Day" });
        userEvent.click(button);
        expect(screen.getByText("DECEMBER 1")).toBeVisible();
    });

    test("clicking 'week' option changes to week view", () => {
        renderWithProviders(<CalendarWrapper />);
        const button = screen.getByRole("button", { name: "Week" });
        userEvent.click(button);
        expect(screen.getByText("NOVEMBER 27 – DECEMBER 3")).toBeVisible();
    });
});
