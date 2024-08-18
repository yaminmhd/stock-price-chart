import { render, screen } from "@testing-library/react";
import PriceChart from "../PriceChart";
import { retrieveStockPrice } from "../../../api/mock";
import useStockChartStore from "../../../store/useStockChartStore";
import { initialState } from "../../../store/utils/testHelpers";
vi.mock("../../../store/useStockChartStore", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("<PriceChart/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  const mockSetSelectedPriceType = vi.fn();
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...initialState,
      setSelectedPriceType: mockSetSelectedPriceType,
    });
  });

  it("should render PriceChart with 1 ticker", () => {
    const stockPriceResult = [retrieveStockPrice("AAPL")];

    render(<PriceChart stockPriceResult={stockPriceResult} />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  it("should render PriceChart with 2 ticker", () => {
    const stockPriceResult = [
      retrieveStockPrice("AAPL"),
      retrieveStockPrice("AMZN"),
    ];

    render(<PriceChart stockPriceResult={stockPriceResult} />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("AMZN")).toBeInTheDocument();
  });
});
