import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { PriceChart } from "../../components/PriceChart";
import { StockSelect } from "../../components/StockSelect";
import { DateRangePicker } from "../../components/DateRangePicker";
import { PriceType } from "../../components/PriceType";
import { useStockPricesQuery } from "../../api/stockPrices";
import useStockChartStore from "../../store/useStockChartStore";

function StockPriceChart() {
  const { selectedStocks, selectedRange } = useStockChartStore();
  const { data, isLoading, isError } = useStockPricesQuery(
    selectedStocks,
    selectedRange
  );

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
        {renderPriceChart()}
      </Grid>
    </Grid>
  );
}

export default StockPriceChart;
