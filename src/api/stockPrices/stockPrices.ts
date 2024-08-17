import { AxiosResponse } from "axios";
import { api } from "../base";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

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
  ticker: string,
  selectedDateRange: DateRange
): Promise<AxiosResponse<StockApiResponse>> => {
  const fromDate = format(selectedDateRange?.from || new Date(), "yyyy-MM-dd");
  const toDate = format(selectedDateRange?.to || new Date(), "yyyy-MM-dd");
  return await api.get(
    `${
      import.meta.env.VITE_POLYGON_BASE_URL
    }v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${
      import.meta.env.VITE_POLYGON_API_KEY
    }`
  );
};

const getStockPrices = async (
  tickers: string[],
  selectedDateRange: DateRange
): Promise<StockApiResponse[]> => {
  const tickerResponses = await Promise.all(
    tickers.map((ticker) => getStockPrice(ticker, selectedDateRange))
  );
  return tickerResponses.map((response) => response.data);
};

export { type StockResult, type StockApiResponse, getStockPrices };
