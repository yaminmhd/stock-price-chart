import { Autocomplete, Chip, TextField } from "@mui/material";
import useStockChartStore from "../../store/useStockChartStore";

const stockOptions = ["AAPL", "AMZN", "GOOGL", "MSFT", "TSLA"];
const StockSelect = () => {
  const { selectedStocks, setSelectedStocks } = useStockChartStore();
  return (
    <Autocomplete
      multiple
      id="stock-multiple-selection"
      options={stockOptions}
      value={selectedStocks}
      onChange={(_, value) => setSelectedStocks(value)}
      renderTags={(value, getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            data-testid={`${option}-chip-tag`}
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} placeholder="Select stocks" />
      )}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionDisabled={() => selectedStocks.length >= 3}
    />
  );
};

export default StockSelect;
