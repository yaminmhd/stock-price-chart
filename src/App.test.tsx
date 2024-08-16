import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
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

  it("should render stock chart and chip when user selects an option", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);
    fireEvent.click(screen.getByText("AAPL"));

    expect(
      screen.queryByText("Select a stock to view the price chart")
    ).toBeNull();
    expect(screen.getAllByText("AAPL").length).toEqual(2);
  });
});
