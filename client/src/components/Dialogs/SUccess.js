import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../actions/appActions";
// MUI components
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
// MUI icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
// components
import Transition from "./Transaition";
import { green } from "@mui/material/colors";

// component
const Success = props => {
  const { success } = useSelector(state => ({
    success: state.app.success,
  }));
  const dispatch = useDispatch();

  // on success close event handler
  const onClose = () => dispatch(setSuccess(""));

  // component styles
  const styles = {
    root: {
      backgroundColor: green[600],
    },
    close: {
      padding: 0.5,
    },
    message: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      fontSize: 20,
      opacity: 0.95,
      marginRight: 1,
    },
  };

  return (
    <Snackbar
      anchorOrigin={props.anchorOrigin}
      open={success !== ""}
      autoHideDuration={props.autoHideDuration}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <SnackbarContent
        sx={styles.root}
        message={
          <span sx={styles.message}>
            <CheckCircleIcon sx={styles.icon} />
            <Typography variant="body1" color="inherit">
              {success && <FormattedMessage id={success} />}
            </Typography>
          </span>
        }
        action={[
          <IconButton
            sx={styles.close}
            color="inherit"
            onClick={onClose}
            size="large"
          >
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
