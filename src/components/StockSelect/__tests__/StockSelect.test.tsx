import { fireEvent, render, screen } from "@testing-library/react";
import StockSelect from "../StockSelect";
import useStockChartStore, {
  initialState,
} from "../../../store/useStockChartStore";
vi.mock("../../../store/useStockChartStore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    __esModule: true,
    default: vi.fn(),
  };
});

describe("<StockSelect/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  const mockSetSelectedStocks = vi.fn();
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...initialState,
      selectedStocks: ["AAPL", "AMZN", "GOOGL"],
      setSelectedStocks: mockSetSelectedStocks,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders input placeholder", () => {
    render(<StockSelect />);
    const inputElement = screen.getByPlaceholderText(/select stocks/i);

    expect(inputElement).toBeInTheDocument();
  });

  it("renders all stock options", () => {
    render(<StockSelect />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);

    expect(screen.getByRole("option", { name: "AAPL" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "GOOGL" })).toBeInTheDocument();
  });

  it("calls handleStockSelection with selected options", () => {
    render(<StockSelect />);

    const inputElement = screen.getByPlaceholderText(/select stocks/i);
    fireEvent.mouseDown(inputElement);
    const optionElement = screen.getByRole("option", { name: "AAPL" });
    fireEvent.click(optionElement);

    expect(mockSetSelectedStocks).toHaveBeenCalled();
  });

  it("renders max of 3 selected chips and disables the rest", async () => {
    render(<StockSelect />);

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
