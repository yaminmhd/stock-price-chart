import { Autocomplete, TextField } from "@mui/material";
import useStockChartStore from "../../store/useStockChartStore";

type PriceTypeOptions = "c" | "o" | "h" | "l";
type PriceTypeConfig = { label: string; value: PriceTypeOptions };

const priceTypesOptions: PriceTypeConfig[] = [
  { label: "Close", value: "c" },
  { label: "Open", value: "o" },
  { label: "High", value: "h" },
  { label: "Low", value: "l" },
];

const PriceType = () => {
  const { selectedPriceType, setSelectedPriceType } = useStockChartStore();
  return (
    <Autocomplete
      id="price-type-selection"
      disableClearable
      value={selectedPriceType}
      onChange={(_, value) => setSelectedPriceType(value as PriceTypeConfig)}
      options={priceTypesOptions}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select price type" />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};

export { type PriceTypeOptions, type PriceTypeConfig, PriceType };
