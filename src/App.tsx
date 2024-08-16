import "./App.css";
import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import { PriceChart } from "./components/PriceChart";
import { retrieveStockPrice } from "./mock";
import { StockSelect } from "./components/StockSelect";
import { Typography, Box } from "@mui/material";

function App() {
  const stockOptions = ["AAPL", "AMZN"];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const stockPriceResult = () => {
    return (
      selectedStocks && selectedStocks.map((stock) => retrieveStockPrice(stock))
    );
  };
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
          <PriceChart stockPriceResult={stockPriceResult()} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
