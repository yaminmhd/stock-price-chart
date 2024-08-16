import { aaplStockPriceResult } from "./AAPL";
import { aazmStockPriceResult } from "./AMZN";

export type StockResult = {
  v: number; // volume
  vw: number; // volume weighted average price
  o: number; // open price
  c: number; // close price
  h: number; // high price
  l: number; // low price
  t: number; // timestamp
  n: number; // number of transactions
};

export type StockApiResponse = {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockResult[];
  status: string;
  request_id: string;
  count: number;
};

export const retrieveStockPrice = (ticker: string): StockApiResponse => {
  if (ticker === "AAPL") {
    return aaplStockPriceResult;
  } else {
    return aazmStockPriceResult;
  }
};
