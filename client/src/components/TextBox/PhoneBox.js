import PropTypes from "prop-types";
// MUI components
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
// MUI icons
import PhoneIcon from "@mui/icons-material/Phone";

// component
const PhoneBox = props => (
  <FormControl
    className={props.className}
    required={props.required}
    fullWidth={props.fullWidth}
  >
    <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
    <Input
      type="phone"
      id={props.name}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      startAdornment={
        props.startAdornment && (
          <InputAdornment position="start">
            {props.startAdornment}
          </InputAdornment>
        )
      }
      endAdornment={
        <InputAdornment position="end">
          <PhoneIcon color="primary" />
        </InputAdornment>
      }
    />
  </FormControl>
);

// defaults props
PhoneBox.defaultProps = {
  required: false,
  fullWidth: true,
  startAdornment: null,
};

// mandatory props
PhoneBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhoneBox;
