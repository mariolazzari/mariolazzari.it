import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
// MUI icons
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
// MUI colors
import red from "@material-ui/core/colors/red";
// components
import Transition from "./Transaition";

// compoennt styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: red[600],
  },
  close: {
    padding: theme.spacing(0.5),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    opacity: 0.95,
    marginRight: theme.spacing(1),
  },
}));

// component
const Error = props => {
  const { error } = useSelector(state => ({
    error: state.app.error,
  }));
  const dispatch = useDispatch();

  // on error close event handler
  const onClose = () => dispatch(setError(""));

  // component styles
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={props.anchorOrigin}
      open={error !== ""}
      autoHideDuration={props.autoHideDuration}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <SnackbarContent
        className={classes.root}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.icon} />
            <Typography variant="body1">
              {error && <FormattedMessage id={error} />}
            </Typography>
          </span>
        }
        action={[
          <IconButton
            key={1}
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

// default props
Error.defaultProps = {
  autoHideDuration: 5000,
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
};

export default Error;
