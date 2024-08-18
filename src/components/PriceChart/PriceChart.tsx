import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { LineChart } from "recharts";
import { StockApiResponse } from "../../api/stockPrices";
import useStockChartStore from "../../store/useStockChartStore";

type PriceChartProps = {
  stockPriceResult: StockApiResponse[];
};

const PriceChart = ({ stockPriceResult }: PriceChartProps) => {
  const { selectedPriceType } = useStockChartStore();

  const generateRandomHexColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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
  );
};

export default PriceChart;
