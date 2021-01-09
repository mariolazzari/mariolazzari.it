import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
// MUI components
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// styles
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Back = props => {
  // navigation history
  const history = useHistory();
  // styles
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      color="primary"
      variant={props.variant}
      onClick={() => history.goBack()}
    >
      {props.label}
    </Button>
  );
};

// default props
Back.defaultProps = {
  label: <FormattedMessage id="button.back" />,
  variant: "contained",
};

export default Back;
