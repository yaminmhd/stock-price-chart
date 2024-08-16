import { AxiosResponse } from "axios";
import { api } from "../base";

type StockResult = {
  v: number; // volume
  vw: number; // volume weighted average price
  o: number; // open price
  c: number; // close price
  h: number; // high price
  l: number; // low price
  t: number; // timestamp
  n: number; // number of transactions
};

type StockApiResponse = {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockResult[];
  status: string;
  request_id: string;
  count: number;
};

const getStockPrice = async (
  ticker: string
): Promise<AxiosResponse<StockApiResponse>> => {
  return await api.get(
    `${
      import.meta.env.VITE_POLYGON_BASE_URL
    }v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${
      import.meta.env.VITE_POLYGON_API_KEY
    }`
  );
};

const getStockPrices = async (
  tickers: string[]
): Promise<StockApiResponse[]> => {
  const tickerResponses = await Promise.all(
    tickers.map((ticker) => getStockPrice(ticker))
  );
  return tickerResponses.map((response) => response.data);
};

export { type StockResult, type StockApiResponse, getStockPrices };
