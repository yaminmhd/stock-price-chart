import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { LineChart } from "recharts";
import { StockApiResponse } from "../../mock";
import { Typography } from "@mui/material";

type PriceChartProps = {
  stockPriceResult: StockApiResponse[];
};

const PriceChart = ({ stockPriceResult = [] }: PriceChartProps) => {
  const formatDataForChart = (
    stockData: StockApiResponse["results"]
  ): { date: string; price: number }[] => {
    return stockData.map((data) => ({
      date: new Date(data.t).toISOString().split("T")[0],
      price: data["c"],
    }));
  };

  if (stockPriceResult.length === 0) {
    return (
      <Typography variant="h3">
        Select a stock to view the price chart
      </Typography>
    );
  }
  return (
    <LineChart width={1000} height={500}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {stockPriceResult.map((stockPriceResult) => (
        <Line
          type="monotone"
          dataKey="price"
          data={formatDataForChart(stockPriceResult.results)}
          name={stockPriceResult.ticker}
          key={stockPriceResult.ticker}
          stroke={`#8884d8`}
        />
      ))}
    </LineChart>
  );
};

export default PriceChart;
