import PropTypes from "prop-types";
// MUI components
import TextField from "@mui/material/TextField";
// Mui icons
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from '@mui/material/colors';

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
      placeholder={props.placeholder}
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
