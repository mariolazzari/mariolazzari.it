import PropTypes from "prop-types";
// MUI components
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// MUI icons
import MailIcon from "@material-ui/icons/Mail";

// component
const MailBox = props => (
  <FormControl
    className={props.className}
    required={props.required}
    fullWidth={props.fullWidth}
  >
    <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
    <Input
      type="email"
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
          <MailIcon color="primary" />
        </InputAdornment>
      }
    />
  </FormControl>
);

// defaults props
MailBox.defaultProps = {
  className: "",
  label: "",
  required: false,
  fullWidth: true,
  startAdornment: null,
};

// mandatory props
MailBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MailBox;
