import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { PriceChart } from "../../components/PriceChart";
import { StockSelect } from "../../components/StockSelect";
import { DateRangePicker } from "../../components/DateRangePicker";
import { PriceType } from "../../components/PriceType";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import FallbackError from "./FallbackError";

function StockPriceChart() {
  return (
    <Grid container padding={5} spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h5">📈 Stock price chart</Typography>
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <Typography variant="h6">
          <TuneIcon data-testid="filter-icon" sx={{ mr: "5px" }} />
          Filters
        </Typography>

        <Typography variant="subtitle2">Stock</Typography>
        <StockSelect />

        <Typography variant="subtitle2" mt={2}>
          Price Type
        </Typography>
        <PriceType />

        <Typography variant="subtitle2" mt={2}>
          Date Range
        </Typography>
        <DateRangePicker />
      </Grid>

      <Grid item xs={12} sm={5} md={9}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={FallbackError}>
              <PriceChart />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Grid>
    </Grid>
  );
}

export default StockPriceChart;
