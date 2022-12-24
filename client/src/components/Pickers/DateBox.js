import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import it from "date-fns/locale/it";

const DateBox = ({ sx, ...rest }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
    <DatePicker
      {...rest}
      renderInput={params => <TextField sx={sx} {...params} />}
    />
  </LocalizationProvider>
);

export default DateBox;
