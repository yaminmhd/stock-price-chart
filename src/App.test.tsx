import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { retrieveStockPrice, StockApiResponse } from "./mock";

vi.mock("@tanstack/react-query");
const mockFetchStockPriceQuery = vi.mocked(useQuery<StockApiResponse[]>);

describe("App", () => {
  beforeEach(() => {
    mockFetchStockPriceQuery.mockReturnValue({
      data: [] as StockApiResponse[],
      isPending: false,
    } as UseQueryResult<StockApiResponse[]>);
  });
  it("should render title", () => {
    render(<App />);

    expect(screen.getByText("Stock Price Chart")).toBeInTheDocument();
  });

  it("should render stock select component", () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/select stocks/i)).toBeInTheDocument();
  });

  it("should render stock chart component default message", () => {
    render(<App />);

    expect(
      screen.getByText("Select a stock to view the price chart")
    ).toBeInTheDocument();
  });

  it("should render loading indicator upon selecting an dropdown option", () => {
    mockFetchStockPriceQuery.mockReturnValue({
      isPending: true,
    } as UseQueryResult<StockApiResponse[]>);

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
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
