import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render App", () => {
    render(<App />);
    expect(screen.getByText("Stock Price Chart")).toBeInTheDocument();
  });
});
