import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { aaplStockPriceResult } from "./data/AAPL";
import { amznStockPriceResult } from "./data/AMZN";

const handlers = [
  http.get(
    `${import.meta.env.VITE_POLYGON_BASE_URL}v2/aggs/ticker/AAPL/range/1/day/*`,
    () => {
      return HttpResponse.json(aaplStockPriceResult);
    }
  ),
  http.get(
    `${import.meta.env.VITE_POLYGON_BASE_URL}v2/aggs/ticker/AMZN/range/1/day/*`,
    () => {
      return HttpResponse.json(amznStockPriceResult);
    }
  ),
];

export const server = setupServer(...handlers);
