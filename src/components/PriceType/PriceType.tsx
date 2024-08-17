import { Autocomplete, TextField } from "@mui/material";

type PriceTypeOptions = "c" | "o" | "h" | "l";
type PriceTypeConfig = { label: string; value: PriceTypeOptions };

type PriceTypeProps = {
  priceTypesOptions: PriceTypeConfig[];
  selectedPriceType: PriceTypeConfig;
  setSelectedPriceType: (value: PriceTypeConfig) => void;
};

const PriceType = ({
  priceTypesOptions,
  selectedPriceType,
  setSelectedPriceType,
}: PriceTypeProps) => {
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
    />
  );
};

export { type PriceTypeOptions, type PriceTypeConfig, PriceType };
