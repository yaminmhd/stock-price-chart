import axios from "axios";

const fetchStockPrice = async (ticker: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_POLYGON_BASE_URL
    }v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${
      import.meta.env.VITE_POLYGON_API_KEY
    }`
  );
};

export const fetchStockPrices = async (tickers: string[]) => {
  const tickerResponses = await Promise.all(
    tickers.map((ticker) => fetchStockPrice(ticker))
  );
  return tickerResponses.map((response) => response.data);
};
