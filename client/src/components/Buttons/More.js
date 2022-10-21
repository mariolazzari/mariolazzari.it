import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";

// styles
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const More = props => {
  // styles
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={props.variant}
      color="primary"
      component={Link}
      to={props.to}
    >
      {props.label}
    </Button>
  );
};

// default props
More.defaultProps = {
  label: <FormattedMessage id="button.more" />,
  variant: "outlined",
};

//mmandatry props
More.propTypes = {
  to: PropTypes.string.isRequired,
};

export default More;
