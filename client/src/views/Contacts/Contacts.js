import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
// component
import Socials from "../../components/Socials";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    minHeight: `calc(100vh - 80px)`,
  },
}));

//components
const Contacts = () => {
  // Redux
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();

  // set route
  useEffect(() => {
    dispatch(setSelectedRoute("/contacts"));
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <form action="">
        <Paper elevation={3}>form</Paper>
      </form>
      <Socials />
    </Box>
  );
};

export default Contacts;
