import { fireEvent, render, screen } from "@testing-library/react";
import StockSelect from "../StockSelect";

describe("<StockSelect/>", () => {
  const mockHandleStockSelection = vi.fn();
  const selectedStocks: string[] = [];
  const stockOptions = ["AAPL", "AMZN"];

  const defaultProps = {
    stockOptions,
    selectedStocks,
    handleStockSelection: mockHandleStockSelection,
  };

  it("renders input placeholder", () => {
    render(<StockSelect {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    expect(inputElement).toBeInTheDocument();
  });

  it("renders all stock options", () => {
    render(<StockSelect {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    stockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls handleStockSelection with selected options", () => {
    render(<StockSelect {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    const optionElement = screen.getByText(stockOptions[0]);
    fireEvent.click(optionElement);

    expect(mockHandleStockSelection).toHaveBeenCalled();
  });

  it("renders max of 3 selected chips and disables the rest", async () => {
    render(
      <StockSelect
        {...defaultProps}
        stockOptions={["AAPL", "AMZN", "GOOGL", "MSFT", "TSLA"]}
        selectedStocks={["AAPL", "AMZN", "GOOGL"]}
      />
    );
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    const firstElement = await screen.findByRole("option", { name: "AAPL" });
    fireEvent.click(firstElement);

    expect(screen.getByTestId("AAPL-chip-tag")).toBeInTheDocument();

    fireEvent.mouseDown(inputElement);
    const secondElement = await screen.findByRole("option", { name: "AMZN" });
    fireEvent.click(secondElement);

    expect(screen.getByTestId("AMZN-chip-tag")).toBeInTheDocument();

    fireEvent.mouseDown(inputElement);
    const thirdElement = await screen.findByRole("option", { name: "GOOGL" });
    fireEvent.click(thirdElement);

    expect(screen.getByTestId("GOOGL-chip-tag")).toBeInTheDocument();

    fireEvent.mouseDown(inputElement);
    const fourthElement = await screen.findByRole("option", { name: "MSFT" });

    expect(fourthElement.getAttribute("aria-disabled")).toBe("true");
    expect(screen.queryByTestId("MSFT-chip-tag")).toBeNull();
  });
});
