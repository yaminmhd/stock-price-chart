import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { LineChart } from "recharts";
import { StockApiResponse } from "../../api/stockPrices";
import { PriceTypeConfig } from "../PriceType";

type PriceChartProps = {
  stockPriceResult: StockApiResponse[];
  selectedPriceType: PriceTypeConfig;
};

const PriceChart = ({
  stockPriceResult,
  selectedPriceType,
}: PriceChartProps) => {
  const formatDataForChart = (
    stockData: StockApiResponse["results"]
  ): { date: string; price: number }[] => {
    return stockData.map((data) => ({
      date: new Date(data.t).toISOString().split("T")[0],
      price: data[selectedPriceType.value],
    }));
  };

  return (
    <LineChart width={1000} height={500}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} />
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
