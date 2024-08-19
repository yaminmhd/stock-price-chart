import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker, { DATE_RANGE_FORMAT } from "../DateRangePicker";
import { addDays, format } from "date-fns";
import useStockChartStore from "../../../store/useStockChartStore";
import { stockChartStore } from "../../../store/utils/testHelpers";
vi.mock("../../../store/useStockChartStore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    __esModule: true,
    default: vi.fn(),
  };
});

describe("<DateRangePicker/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  const mockSetSelectedRange = vi.fn();
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      setSelectedRange: mockSetSelectedRange,
    });
  });

  it("should render DateRangePicker component with default display", () => {
    render(<DateRangePicker />);

    const { from, to } = stockChartStore.selectedRange;
    const fromDate = from ? format(from, DATE_RANGE_FORMAT) : "";
    const toDate = to ? format(to, DATE_RANGE_FORMAT) : "";

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(
      screen.getByText(`From: ${fromDate} - To: ${toDate}`)
    ).toBeInTheDocument();
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
