import { render, screen } from "@testing-library/react";
import PriceChart from "../PriceChart";
import { stockPriceResult } from "../../../mockData";

describe("<PriceChart/>", () => {
  it("should render PriceChart", () => {
    render(<PriceChart stockPriceResult={stockPriceResult} />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });
});
