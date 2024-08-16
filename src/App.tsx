import "./App.css";
import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import { PriceChart } from "./components/PriceChart";
import { StockApiResponse } from "./mock";
import { StockSelect } from "./components/StockSelect";
import { Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchStockPrices } from "./api";
import { AxiosError } from "axios";

function App() {
  const stockOptions = ["AAPL", "AMZN"];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const { data, isPending, isError } = useQuery<StockApiResponse[], AxiosError>(
    {
      queryKey: ["stockPrice", selectedStocks],
      queryFn: () => fetchStockPrices(selectedStocks),
      enabled: selectedStocks.length > 0,
    }
  );

  const handleStockSelection = (
    _: SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    setSelectedStocks(value);
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
          {isPending && <Typography>Loading...</Typography>}
          {isError && <Typography>Error fetching data</Typography>}
          {!isPending && !isError && <PriceChart stockPriceResult={data} />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
