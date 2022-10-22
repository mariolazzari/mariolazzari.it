import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../actions/appActions";
// MUI components
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
// MUI icons
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
// components
import Transition from "./Transaition";
import { red } from "@mui/material/colors";

// component
const Error = props => {
  const { error } = useSelector(state => ({
    error: state.app.error,
  }));
  const dispatch = useDispatch();

  // on error close event handler
  const onClose = () => dispatch(setError(""));

  // compoennt styles
  const styles = {
    root: {
      backgroundColor: red[600],
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
      open={error !== ""}
      autoHideDuration={props.autoHideDuration}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <SnackbarContent
        sx={styles.root}
        message={
          <span sx={styles.message}>
            <ErrorIcon sx={styles.icon} />
            <Typography variant="body1">
              {error && <FormattedMessage id={error} />}
            </Typography>
          </span>
        }
        action={[
          <IconButton
            sx={styles.close}
            key={1}
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
Error.defaultProps = {
  autoHideDuration: 5000,
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
};

export default Error;
