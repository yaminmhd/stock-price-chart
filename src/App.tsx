import "./App.css";
import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import { PriceChart } from "./components/PriceChart";

import { StockSelect } from "./components/StockSelect";
import { Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getStockPrices, StockApiResponse } from "./api/stockPrices";
import { AxiosError } from "axios";

function App() {
  const stockOptions = ["AAPL", "AMZN"];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery<StockApiResponse[], AxiosError>(
    {
      queryKey: ["stockPrice", selectedStocks],
      queryFn: () => getStockPrices(selectedStocks),
      enabled: selectedStocks.length > 0,
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
    <Grid container rowSpacing={4} spacing={2}>
      <Grid xs={12}>
        <Typography variant="h1">Stock Price Chart</Typography>
      </Grid>

      <Grid xs={6} sx={{ mb: "20px" }}>
        <StockSelect
          stockOptions={stockOptions}
          handleStockSelection={handleStockSelection}
        />
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
