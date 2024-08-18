import { useQuery } from "@tanstack/react-query";
import { getStockPrices, StockApiResponse } from "./stockPrices";
import { AxiosError } from "axios";
import { DateRange } from "react-day-picker";

const useStockPricesQuery = (
  selectedStocks: string[],
  selectedRange: DateRange
) => {
  return useQuery<StockApiResponse[], AxiosError>({
    queryKey: ["stockPrice", selectedStocks, selectedRange],
    queryFn: () => getStockPrices(selectedStocks, selectedRange),
    enabled: selectedStocks.length > 0 && selectedRange !== undefined,
  });
};

export { useStockPricesQuery };
