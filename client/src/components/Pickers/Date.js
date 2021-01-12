import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function Date() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={props.value} onChange={props.onChange} />
    </MuiPickersUtilsProvider>
  );
}

export default Date;
