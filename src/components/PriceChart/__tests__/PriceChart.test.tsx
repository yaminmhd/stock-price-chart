import { render, screen } from "@testing-library/react";
import PriceChart from "../PriceChart";
import { retrieveStockPrice } from "../../../api/mock";

describe("<PriceChart/>", () => {
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
