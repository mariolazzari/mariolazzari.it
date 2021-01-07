import PropTypes from "prop-types";
// MUI components
import TextField from "@material-ui/core/TextField";
// Mui icons
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
// MUI colors
import red from "@material-ui/core/colors/red";

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
        startAdornment: (
          <InputAdornment position="end">{props.startIcon}</InputAdornment>
        ),
        endAdornment: props.onClear ? (
          <ClearIcon
            style={{ color: red[800], cursor: "pointer" }}
            onClick={props.onClear}
          />
        ) : null,
      }}
    />
  );
};

// default props
TextBox.defaultProps = {
  autoFocus: false,
  fullWidth: true,
  required: true,
  startIcon: <EditIcon color="primary" />,
};

// mandatory props
TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
