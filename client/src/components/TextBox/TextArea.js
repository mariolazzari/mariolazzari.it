import PropTypes from "prop-types";
// MUI components
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// MUI icons
import EditIcon from "@material-ui/icons/Create";

// component
const TextArea = props => (
  <FormControl
    className={props.className}
    required={props.required}
    fullWidth={props.fullWidth}
  >
    <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
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
          <EditIcon color="primary" />
        </InputAdornment>
      }
      multiline
      rows={props.rows}
      rowsMax={props.rowsMax}
    />
  </FormControl>
);

// defaults props
TextArea.defaultProps = {
  required: false,
  fullWidth: true,
  startAdornment: null,
  rows: 8,
  rowsMax: 8,
};

// mandatory props
TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
