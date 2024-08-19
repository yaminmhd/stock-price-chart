import {
  StockChartState,
  StockChartActions,
  initialState,
} from "../useStockChartStore";

export const stockChartStore: StockChartState & StockChartActions = {
  ...initialState,
  setSelectedStocks: vi.fn(),
  setSelectedPriceType: vi.fn(),
  setSelectedRange: vi.fn(),
};
