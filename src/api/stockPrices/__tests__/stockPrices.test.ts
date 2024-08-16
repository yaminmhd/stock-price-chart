import { HttpResponse, http } from "msw";
import { server } from "../../mock/server";
import { getStockPrices } from "../stockPrices";
import { aaplStockPriceResult } from "../../mock/data/AAPL";
import { aazmStockPriceResult } from "../../mock/data/AMZN";

describe("getStockPrices API", () => {
  it("fetches and returns stock prices data for given tickers", async () => {
    const tickers = ["AAPL", "AMZN"];
    const responses = await getStockPrices(tickers);

    expect(responses).toHaveLength(tickers.length);
    expect(responses[0]).toEqual(aaplStockPriceResult);
    expect(responses[1]).toEqual(aazmStockPriceResult);
  });

  it("handles network errors", async () => {
    server.use(
      http.get(
        "https://api.polygon.io/v2/aggs/ticker/:ticker/range/1/day/:from/:to",
        () => {
          return new HttpResponse("error", { status: 500 });
        }
      )
    );

    const tickers = ["AAPL"];
    await expect(getStockPrices(tickers)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});
