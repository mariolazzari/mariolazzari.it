import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";

// styles
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Back = props => {
  // styles
  const classes = useStyles();
  // routes
  const navigate = useNavigate();

  return (
    <Button
      className={classes.button}
      color="primary"
      variant={props.variant}
      onClick={() => navigate(-1)}
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
