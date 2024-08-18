import { startOfMonth } from "date-fns";
import { StockChartState } from "../useStockChartStore";

export const initialState: StockChartState = {
  selectedStocks: ["AAPL", "AMZN", "GOOGL"],
  selectedPriceType: { label: "Close", value: "c" },
  selectedRange: { from: startOfMonth(new Date()), to: new Date() },
  setSelectedStocks: vi.fn(),
  setSelectedPriceType: vi.fn(),
  setSelectedRange: vi.fn(),
};
