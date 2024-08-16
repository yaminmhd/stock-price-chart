import { Autocomplete, Chip, TextField } from "@mui/material";
import { SyntheticEvent } from "react";

type StockSelectProps = {
  stockOptions: string[];
  handleStockSelection: (event: SyntheticEvent, value: string[]) => void;
};

const StockSelect = ({
  stockOptions,
  handleStockSelection,
}: StockSelectProps) => {
  return (
    <Autocomplete
      multiple
      id="stock-multiple-selection"
      options={stockOptions}
      onChange={handleStockSelection}
      renderTags={(value, getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select stocks" />
      )}
    />
  );
};

export default StockSelect;
