import { fireEvent, render, screen } from "@testing-library/react";
import StockSelect from "../StockSelect";

describe("<StockSelect/>", () => {
  const mockHandleStockSelection = vi.fn();
  const stockOptions = ["AAPL", "AMZN"];

  beforeEach(() => {
    render(
      <StockSelect
        stockOptions={stockOptions}
        handleStockSelection={mockHandleStockSelection}
      />
    );
  });

  it("renders input placeholder", () => {
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    expect(inputElement).toBeInTheDocument();
  });

  it("renders all stock options", () => {
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    stockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls handleStockSelection with selected options", () => {
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    const optionElement = screen.getByText(stockOptions[0]);
    fireEvent.click(optionElement);

    expect(mockHandleStockSelection).toHaveBeenCalled();
  });

  it("renders selected chips", async () => {
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    fireEvent.mouseDown(inputElement);
    const firstElement = screen.getByText(stockOptions[0]);
    fireEvent.click(firstElement);

    expect(await screen.findByText("AAPL")).toBeInTheDocument();

    fireEvent.mouseDown(inputElement);
    const secondElement = await screen.findByText(stockOptions[1]);
    fireEvent.click(secondElement);

    expect(await screen.findByText("AMZN")).toBeInTheDocument();
  });
});
