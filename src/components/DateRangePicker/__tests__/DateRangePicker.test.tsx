import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from "../DateRangePicker";
import { addDays } from "date-fns";
import useStockChartStore from "../../../store/useStockChartStore";
import { initialState } from "../../../store/utils/testHelpers";
vi.mock("../../../store/useStockChartStore", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("<DateRangePicker/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  const mockSetSelectedRange = vi.fn();
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...initialState,
      setSelectedRange: mockSetSelectedRange,
    });
  });

  it("should render DateRangePicker component", () => {
    render(<DateRangePicker />);

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("should disable future dates outside the allowed range", () => {
    render(<DateRangePicker />);

    const futureDates = addDays(new Date(), 2);
    const futureDateButton = screen.getByText(futureDates.getDate().toString());

    expect(futureDateButton).toBeDisabled();
  });

  it("should call setSelectedRange when a valid date range is selected", () => {
    render(<DateRangePicker />);

    const today = new Date();
    fireEvent.click(screen.getByText(today.getDate().toString()));

    expect(mockSetSelectedRange).toHaveBeenCalled();
  });
});
