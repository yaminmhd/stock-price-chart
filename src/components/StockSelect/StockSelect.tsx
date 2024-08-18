import { Autocomplete, Chip, TextField } from "@mui/material";
import { SyntheticEvent } from "react";

type StockSelectProps = {
  stockOptions: string[];
  selectedStocks: string[];
  handleStockSelection: (event: SyntheticEvent, value: string[]) => void;
};

const StockSelect = ({
  stockOptions,
  selectedStocks,
  handleStockSelection,
}: StockSelectProps) => {
  return (
    <Autocomplete
      multiple
      id="stock-multiple-selection"
      options={stockOptions}
      value={selectedStocks}
      onChange={handleStockSelection}
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
