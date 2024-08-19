import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PriceType } from "../PriceType";
import useStockChartStore from "../../../store/useStockChartStore";
import { stockChartStore } from "../../../store/utils/testHelpers";
vi.mock("../../../store/useStockChartStore", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("<PriceType/>", () => {
  const mockedUseStockChartStore = vi.mocked(useStockChartStore);
  const mockSetSelectedPriceType = vi.fn();
  beforeEach(() => {
    mockedUseStockChartStore.mockReturnValue({
      ...stockChartStore,
      setSelectedPriceType: mockSetSelectedPriceType,
    });
  });

  it("renders the component with initial selected value", () => {
    render(<PriceType />);

    const inputElement = screen.getByPlaceholderText("Select price type");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Close");
  });

  it("calls setSelectedPriceType when a new option is selected", () => {
    render(<PriceType />);

    const inputElement = screen.getByPlaceholderText("Select price type");
    fireEvent.mouseDown(inputElement);

    const newOption = screen.getByText("Open");
    fireEvent.click(newOption);

    expect(mockSetSelectedPriceType).toHaveBeenCalledWith({
      label: "Open",
      value: "o",
    });
  });
});
