import { fireEvent, screen } from "@testing-library/react";
import { server } from "../../../api/mock";
import useStockChartStore from "../../../store/useStockChartStore";
import StockPriceChart from "../StockPriceChart";
import { stockChartStore } from "../../../store/utils/testHelpers";
import { http, HttpResponse } from "msw";
import { renderWithClient } from "./utils";
vi.mock("../../../store/useStockChartStore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    __esModule: true,
    default: vi.fn(),
  };
});

describe("StockPriceChart", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render title and filters section", () => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
    });
    renderWithClient(<StockPriceChart />);

    expect(screen.getByText("📈 Stock price chart")).toBeInTheDocument();

    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(screen.getByTestId("filter-icon")).toBeInTheDocument();

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select stocks/i)).toBeInTheDocument();

    expect(screen.getByText(/price type/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/select price type/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/date range/i)).toBeInTheDocument();
    expect(screen.getByTestId("date-range-picker")).toBeInTheDocument();
  });

  it("should render stock chart component default message", () => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
    });

    renderWithClient(<StockPriceChart />);

    expect(
      screen.getByText(/select a stock to view the price chart/i)
    ).toBeInTheDocument();
  });

  it("should render loading indicator upon selecting an dropdown option", async () => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      selectedStocks: ["AAPL"],
    });

    renderWithClient(<StockPriceChart />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);

    fireEvent.click(screen.getByRole("option", { name: /AAPL/i }));

    expect(await screen.findByTestId("loading-icon")).toBeInTheDocument();
  });

  it("should render stock price chart and chip when user selects an option", async () => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      selectedStocks: ["AAPL"],
    });

    renderWithClient(<StockPriceChart />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);

    fireEvent.click(screen.getByRole("option", { name: /AAPL/i }));
    expect(await screen.findByTestId("loading-icon")).toBeInTheDocument();

    expect(
      screen.queryByText("Select a stock to view the price chart")
    ).toBeNull();
    expect(await screen.findByTestId("AAPL-chip-tag")).toBeInTheDocument();
    expect(await screen.findByTestId("price-chart")).toBeInTheDocument();
  });

  it("should render fallback error component when fetch fetching stock price query fails", () => {
    server.use(
      http.get(
        "https://api.polygon.io/v2/aggs/ticker/*/range/1/day/*/*",
        () => {
          return new HttpResponse("error", { status: 500 });
        }
      )
    );

    renderWithClient(<StockPriceChart />);

    expect(
      screen.getByText("Error encountered fetching stock price data")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" })
    ).toBeInTheDocument();
  });
});
