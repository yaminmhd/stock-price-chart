import { StockApiResponse } from "../../stockPrices";
import { aaplStockPriceResult } from "../data/AAPL";
import { amznStockPriceResult } from "../data/AMZN";

const stockPricesResults: Record<string, StockApiResponse> = {
  AAPL: aaplStockPriceResult,
  AMZN: amznStockPriceResult,
};

export const retrieveStockPrice = (ticker: string): StockApiResponse => {
  return stockPricesResults[ticker];
};
