import { Box, Typography } from "@mui/material";
import { subYears, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useStockChartStore from "../../store/useStockChartStore";

export const DATE_RANGE_FORMAT = "yyyy-MM-dd";

const DateRangePicker = () => {
  const selectedRange = useStockChartStore((state) => state.selectedRange);
  const setSelectedRange = useStockChartStore(
    (state) => state.setSelectedRange
  );

  const displaySelectedDateRange = () => {
    return (
      <Typography variant="caption">
        {`From: ${format(
          selectedRange?.from || new Date(),
          DATE_RANGE_FORMAT
        )}`}{" "}
        - {`To: ${format(selectedRange?.to || new Date(), DATE_RANGE_FORMAT)}`}
      </Typography>
    );
  };
  return (
    <Box data-testid="date-range-picker">
      {displaySelectedDateRange()}
      <DayPicker
        mode="range"
        required
        captionLayout="dropdown-years"
        numberOfMonths={1}
        selected={selectedRange}
        onSelect={setSelectedRange}
        disabled={{ before: subYears(new Date(), 2), after: new Date() }}
      />
    </Box>
  );
};

export default DateRangePicker;
