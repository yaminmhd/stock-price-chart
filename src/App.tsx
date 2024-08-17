import "./App.css";
import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import { PriceChart } from "./components/PriceChart";

import { StockSelect } from "./components/StockSelect";
import { Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getStockPrices, StockApiResponse } from "./api/stockPrices";
import { AxiosError } from "axios";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./components/DateRangePicker";

function App() {
  const stockOptions = ["AAPL", "AMZN"];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
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

    return <PriceChart stockPriceResult={data ?? []} />;
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant="h2">Stock Price Chart</Typography>
      </Grid>

      <Grid xs={12} sx={{ mb: "20px" }}>
        <Box display="flex" justifyContent="center">
          <StockSelect
            stockOptions={stockOptions}
            selectedStocks={selectedStocks}
            handleStockSelection={handleStockSelection}
          />
        </Box>
      </Grid>

      <Grid xs={12}>
        <Box display="flex" justifyContent="center">
          <DateRangePicker
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </Box>
      </Grid>

      <Grid xs={12}>
        <Box display="flex" justifyContent="center">
          {renderPriceChart()}
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
