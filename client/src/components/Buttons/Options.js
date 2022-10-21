import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
// MUI icons
import OptionIcon from "@mui/icons-material/Settings";

// styles
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Options = props => {
  // styles
  const classes = useStyles();

  // pm click event handler
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Button
      className={classes.button}
      variant={props.variant}
      color="primary"
      onClick={onClick}
    >
      <OptionIcon />
      {props.label}
    </Button>
  );
};

// default props
Options.defaultProps = {
  label: <FormattedMessage id="button.options" />,
  variant: "outlined",
};

//mmandatry props
Options.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Options;
