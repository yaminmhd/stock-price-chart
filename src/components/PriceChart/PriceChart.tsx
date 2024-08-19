import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { LineChart } from "recharts";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StockApiResponse, useStockPricesQuery } from "../../api/stockPrices";
import useStockChartStore from "../../store/useStockChartStore";

const PriceChart = () => {
  const { selectedPriceType, selectedStocks, selectedRange } =
    useStockChartStore();
  const { data: stockPriceResult } = useStockPricesQuery(
    selectedStocks,
    selectedRange
  );

  const generateRandomHexColor = (): string => {
    let color: string;
    do {
      color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    } while (color === "#FFFFFF" || color === "#000000");
    return color;
  };

  const formatDataForChart = (
    stockData: StockApiResponse["results"]
  ): { date: string; price: number }[] => {
    return stockData.map((data) => ({
      date: new Date(data.t).toISOString().split("T")[0],
      price: data[selectedPriceType.value],
    }));
  };

  if (selectedStocks.length === 0) {
    return (
      <Typography variant="h6">
        Select a stock to view the price chart
      </Typography>
    );
  }

  if (stockPriceResult) {
    return (
      <Box data-testid="price-chart">
        <LineChart width={1000} height={700}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {stockPriceResult.map((stock) => (
            <Line
              type="monotone"
              dataKey="price"
              data={formatDataForChart(stock.results)}
              name={stock.ticker}
              key={stock.ticker}
              stroke={generateRandomHexColor()}
            />
          ))}
        </LineChart>
      </Box>
    );
  }

  return <CircularProgress data-testid="loading-icon" size={30} />;
};

export default PriceChart;
