import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PriceType, PriceTypeConfig } from "../PriceType";

describe("<PriceType/>", () => {
  const priceTypesOptions: PriceTypeConfig[] = [
    { label: "Close", value: "c" },
    { label: "Open", value: "o" },
    { label: "High", value: "h" },
    { label: "Low", value: "l" },
  ];

  it("renders the component with initial selected value", () => {
    const mockSetSelectedPriceType = vi.fn();
    const initialSelectedPriceType = priceTypesOptions[0];

    render(
      <PriceType
        priceTypesOptions={priceTypesOptions}
        selectedPriceType={initialSelectedPriceType}
        setSelectedPriceType={mockSetSelectedPriceType}
      />
    );

    const inputElement = screen.getByPlaceholderText("Select price type");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialSelectedPriceType.label);
  });

  it("calls setSelectedPriceType when a new option is selected", () => {
    const mockSetSelectedPriceType = vi.fn();
    const initialSelectedPriceType = priceTypesOptions[0];

    render(
      <PriceType
        priceTypesOptions={priceTypesOptions}
        selectedPriceType={initialSelectedPriceType}
        setSelectedPriceType={mockSetSelectedPriceType}
      />
    );

    const inputElement = screen.getByPlaceholderText("Select price type");
    fireEvent.mouseDown(inputElement);

    const newOption = screen.getByText("Open");
    fireEvent.click(newOption);

    expect(mockSetSelectedPriceType).toHaveBeenCalledWith(priceTypesOptions[1]);
  });
});
