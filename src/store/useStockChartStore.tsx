import { create } from "zustand";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { PriceTypeConfig } from "../components/PriceType";

export type StockChartState = {
  selectedStocks: string[];
  selectedPriceType: PriceTypeConfig;
  selectedRange: DateRange;
  setSelectedStocks: (stocks: string[]) => void;
  setSelectedPriceType: (priceType: PriceTypeConfig) => void;
  setSelectedRange: (range: DateRange) => void;
};

const useStockChartStore = create<StockChartState>((set) => ({
  selectedStocks: [],
  selectedPriceType: { label: "Close", value: "c" },
  selectedRange: { from: startOfMonth(new Date()), to: new Date() },
  setSelectedStocks: (stocks) => set({ selectedStocks: stocks }),
  setSelectedPriceType: (priceType) => set({ selectedPriceType: priceType }),
  setSelectedRange: (range) => set({ selectedRange: range }),
}));

export default useStockChartStore;
