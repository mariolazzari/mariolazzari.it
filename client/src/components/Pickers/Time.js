import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function Time(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker value={props.value} onChange={props.onChange} />
    </MuiPickersUtilsProvider>
  );
}

export default Time;
