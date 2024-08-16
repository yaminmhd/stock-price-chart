import "./App.css";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PriceChart } from "./components/PriceChart";
import { stockPriceResult } from "./mockData";

function App() {
  return (
    <Grid container rowSpacing={4} spacing={2}>
      <Grid xs={12}>
        <Typography variant="h1">Stock Price Chart</Typography>
      </Grid>

      <Grid xs={12}>
        <Box display="flex" justifyContent="center">
          <PriceChart stockPriceResult={stockPriceResult} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
