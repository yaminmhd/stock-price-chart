import { StockApiResponse } from "../../stockPrices";
import { aaplStockPriceResult } from "../data/AAPL";
import { aazmStockPriceResult } from "../data/AMZN";

export const retrieveStockPrice = (ticker: string): StockApiResponse => {
  if (ticker === "AAPL") {
    return aaplStockPriceResult;
  } else {
    return aazmStockPriceResult;
  }
};
