import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import { PriceChart } from "./components/PriceChart";

import { StockSelect } from "./components/StockSelect";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getStockPrices, StockApiResponse } from "./api/stockPrices";
import { AxiosError } from "axios";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./components/DateRangePicker";
import TuneIcon from "@mui/icons-material/Tune";
import { PriceType, PriceTypeConfig } from "./components/PriceType";

function App() {
  const stockOptions = ["AAPL", "AMZN"];
  const priceTypesOptions: PriceTypeConfig[] = [
    { label: "Close", value: "c" },
    { label: "Open", value: "o" },
    { label: "High", value: "h" },
    { label: "Low", value: "l" },
  ];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedPriceType, setSelectedPriceType] = useState<PriceTypeConfig>(
    priceTypesOptions[0]
  );
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const { data, isLoading, isError } = useQuery<StockApiResponse[], AxiosError>(
    {
      queryKey: ["stockPrice", selectedStocks, selectedRange],
      queryFn: () => getStockPrices(selectedStocks, selectedRange),
      enabled: selectedStocks.length > 0 && selectedRange !== undefined,
    }
  );

  const handleStockSelection = (
    _: SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    setSelectedStocks(value);
  };

  const renderPriceChart = () => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }

    if (isError) {
      return <Typography>Error fetching data</Typography>;
    }

    if (selectedStocks.length === 0) {
      return (
        <Typography variant="h6">
          Select a stock to view the price chart
        </Typography>
      );
    }

    return (
      <PriceChart
        stockPriceResult={data ?? []}
        selectedPriceType={selectedPriceType}
      />
    );
  };

  return (
    <Grid container padding={8} spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h5">📈 Stock price chart</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">
          <TuneIcon data-testid="filter-icon" sx={{ mr: "5px" }} />
          Filters
        </Typography>

        <Typography variant="subtitle2">Stock</Typography>
        <StockSelect
          stockOptions={stockOptions}
          selectedStocks={selectedStocks}
          handleStockSelection={handleStockSelection}
        />

        <Typography variant="subtitle2" mt={2}>
          Price Type
        </Typography>
        <PriceType
          priceTypesOptions={priceTypesOptions}
          selectedPriceType={selectedPriceType}
          setSelectedPriceType={setSelectedPriceType}
        />

        <Typography variant="subtitle2" mt={2}>
          Date Range
        </Typography>
        <DateRangePicker
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        {renderPriceChart()}
      </Grid>
    </Grid>
  );
}

export default App;
