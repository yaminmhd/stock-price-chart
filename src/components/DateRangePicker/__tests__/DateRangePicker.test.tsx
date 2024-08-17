import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from "../DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

describe("DateRangePicker Component", () => {
  const mockSetSelectedRange = vi.fn();
  const initialRange: DateRange = { from: new Date(), to: new Date() };

  beforeEach(() => {
    render(
      <DateRangePicker
        selectedRange={initialRange}
        setSelectedRange={mockSetSelectedRange}
      />
    );
  });

  it("should render DateRangePicker component", () => {
    const datePicker = screen.getByRole("grid");
    expect(datePicker).toBeInTheDocument();
  });

  it("should disable future dates outside the allowed range", () => {
    const futureDates = addDays(new Date(), 2);

    const futureDateButton = screen.getByText(futureDates.getDate().toString());

    expect(futureDateButton).toBeDisabled();
  });

  it("should call setSelectedRange when a valid date range is selected", () => {
    const today = new Date();

    fireEvent.click(screen.getByText(today.getDate().toString()));

    expect(mockSetSelectedRange).toHaveBeenCalled();
  });
});
