import { render, screen } from "@testing-library/react";
import PriceChart from "../PriceChart";
import { retrieveStockPrice } from "../../../mock";

describe("<PriceChart/>", () => {
  it("should not render PriceChart and render message when stockPriceResult is empty", () => {
    render(<PriceChart stockPriceResult={[]} />);

    expect(
      screen.getByText("Select a stock to view the price chart")
    ).toBeInTheDocument();
    expect(screen.queryByText("AAPL")).to.not.toBeInTheDocument();
    expect(screen.queryByText("AMZN")).to.not.toBeInTheDocument();
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
