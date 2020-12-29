import PropTypes from "prop-types";
// MUI components
import TextField from "@material-ui/core/TextField";
// Mui icons
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";

// component
const TextBox = props => {
  return (
    <TextField
      className={props.className}
      autoFocus={props.autoFocus}
      id={props.name}
      name={props.name}
      fullWidth={props.fullWidth}
      label={props.label}
      onChange={props.onChange}
      required={props.required}
      value={props.value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <EditIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

// default props
TextBox.defaultProps = {
  autoFocus: false,
  fullWidth: true,
  required: true,
};

// mandatory props
TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
