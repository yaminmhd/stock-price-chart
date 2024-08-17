import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { retrieveStockPrice } from "./api/mock";
import { StockApiResponse } from "./api/stockPrices";

vi.mock("@tanstack/react-query");
const mockFetchStockPriceQuery = vi.mocked(useQuery<StockApiResponse[]>);

describe("App", () => {
  beforeEach(() => {
    mockFetchStockPriceQuery.mockReturnValue({
      data: [] as StockApiResponse[],
      isPending: false,
    } as UseQueryResult<StockApiResponse[]>);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render title and filters", () => {
    render(<App />);

    expect(screen.getByText("📈 Stock price chart")).toBeInTheDocument();
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(screen.getByTestId("filter-icon")).toBeInTheDocument();
  });

  it("should render stock select component", () => {
    render(<App />);

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select stocks/i)).toBeInTheDocument();
  });

  it("should render price type component", () => {
    render(<App />);

    expect(screen.getByText(/price type/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/select price type/i)
    ).toBeInTheDocument();
  });

  it("should render date range component", () => {
    render(<App />);

    expect(screen.getByText(/date range/i)).toBeInTheDocument();
    expect(screen.getByTestId("date-range-picker")).toBeInTheDocument();
  });

  it("should render stock chart component default message", () => {
    render(<App />);

    expect(
      screen.getByText(/select a stock to view the price chart/i)
    ).toBeInTheDocument();
  });

  it("should render loading indicator upon selecting an dropdown option", async () => {
    mockFetchStockPriceQuery.mockReturnValue({
      isLoading: true,
    } as UseQueryResult<StockApiResponse[]>);

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);

    fireEvent.click(screen.getByRole("option", { name: /AAPL/i }));

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("should render stock chart and chip when user selects an option", () => {
    const result = [retrieveStockPrice("AAPL")];
    mockFetchStockPriceQuery.mockReturnValue({
      data: result as StockApiResponse[],
      isPending: false,
    } as UseQueryResult<StockApiResponse[]>);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);

    fireEvent.click(screen.getByRole("option", { name: /AAPL/i }));

    expect(
      screen.queryByText("Select a stock to view the price chart")
    ).toBeNull();
    expect(screen.getAllByText("AAPL").length).toEqual(2);
  });

  it("should render error indicator when fetch feching stock price query fails", () => {
    mockFetchStockPriceQuery.mockReturnValue({
      isError: true,
    } as UseQueryResult<StockApiResponse[]>);

    render(<App />);

    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });
});
