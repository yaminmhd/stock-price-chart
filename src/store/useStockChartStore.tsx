import { create } from "zustand";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { PriceTypeConfig } from "../components/PriceType";

export type StockChartActions = {
  setSelectedStocks: (stocks: string[]) => void;
  setSelectedPriceType: (priceType: PriceTypeConfig) => void;
  setSelectedRange: (range: DateRange) => void;
};

export type StockChartState = {
  selectedStocks: string[];
  selectedPriceType: PriceTypeConfig;
  selectedRange: DateRange;
};

export const initialState: StockChartState = {
  selectedStocks: [],
  selectedPriceType: { label: "Close", value: "c" },
  selectedRange: { from: startOfMonth(new Date()), to: new Date() },
};

const useStockChartStore = create<StockChartState & StockChartActions>(
  (set) => ({
    selectedStocks: [],
    selectedPriceType: { label: "Close", value: "c" },
    selectedRange: { from: startOfMonth(new Date()), to: new Date() },
    setSelectedStocks: (stocks) => set({ selectedStocks: stocks }),
    setSelectedPriceType: (priceType) => set({ selectedPriceType: priceType }),
    setSelectedRange: (range) => set({ selectedRange: range }),
  })
);

export default useStockChartStore;
