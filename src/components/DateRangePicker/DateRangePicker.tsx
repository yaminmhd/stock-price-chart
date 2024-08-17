import { Box } from "@mui/material";
import { subYears } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DateRangePickerProps = {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
};

const DateRangePicker = ({
  selectedRange,
  setSelectedRange,
}: DateRangePickerProps) => {
  return (
    <Box data-testid="date-range-picker">
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
