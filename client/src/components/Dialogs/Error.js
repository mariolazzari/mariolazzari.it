import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
// MUI icons
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
// components
import Transition from "./Transaition";
import { red } from '@mui/material/colors';

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
            size="large">
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
