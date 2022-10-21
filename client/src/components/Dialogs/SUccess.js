import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
// MUI icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
// components
import Transition from "./Transaition";
import { green } from '@mui/material/colors';

// component styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: green[600],
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
const Success = props => {
  const { success } = useSelector(state => ({
    success: state.app.success,
  }));
  const dispatch = useDispatch();

  // on success close event handler
  const onClose = () => dispatch(setSuccess(""));

  // component styles
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={props.anchorOrigin}
      open={success !== ""}
      autoHideDuration={props.autoHideDuration}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <SnackbarContent
        className={classes.root}
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            <Typography variant="body1" color="inherit">
              {success && <FormattedMessage id={success} />}
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
Success.defaultProps = {
  autoHideDuration: 5000,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
};

export default Success;
