import { fireEvent, render, screen } from "@testing-library/react";
import PriceChart from "../PriceChart";
import { retrieveStockPrice } from "../../../api/mock";
import useStockChartStore from "../../../store/useStockChartStore";
import { stockChartStore } from "../../../store/utils/testHelpers";
import { StockApiResponse } from "../../../api/stockPrices";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
vi.mock("../../../store/useStockChartStore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    __esModule: true,
    default: vi.fn(),
  };
});
vi.mock("@tanstack/react-query");
const mockFetchStockPriceQuery = vi.mocked(useQuery<StockApiResponse[]>);

describe("<PriceChart/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      selectedStocks: ["AAPL", "AMZN"],
    });
    mockFetchStockPriceQuery.mockReturnValue({
      data: [retrieveStockPrice("AAPL")],
    } as UseQueryResult<StockApiResponse[], AxiosError>);
  });

  it("should render PriceChart with a single ticker", () => {
    render(<PriceChart />);

    expect(mockFetchStockPriceQuery).toHaveBeenCalled();
    const tickerLegend = screen.getByText("AAPL");
    expect(tickerLegend).toBeInTheDocument();
  });

  it("should render PriceChart with multiple tickers", () => {
    const stockPriceResult = [
      retrieveStockPrice("AAPL"),
      retrieveStockPrice("AMZN"),
    ];
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      selectedStocks: ["AAPL", "AMZN"],
    });
    mockFetchStockPriceQuery.mockReturnValue({
      data: stockPriceResult,
    } as UseQueryResult<StockApiResponse[], AxiosError>);

    render(<PriceChart />);

    const firstTickerLegend = screen.getByText("AAPL");
    const secondTickerLegend = screen.getByText("AAPL");
    expect(firstTickerLegend).toBeInTheDocument();
    expect(secondTickerLegend).toBeInTheDocument();
  });

  it("should render stock chart component default message", () => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      selectedStocks: [],
    });
    render(<PriceChart />);

    expect(
      screen.getByText(/select a stock to view the price chart/i)
    ).toBeInTheDocument();
  });

  it("should render loading indicator upon selecting an dropdown option", async () => {
    mockFetchStockPriceQuery.mockReturnValue({
      data: undefined,
    } as UseQueryResult<StockApiResponse[]>);

    render(<PriceChart />);

    expect(await screen.findByTestId("loading-icon")).toBeInTheDocument();
  });
});
