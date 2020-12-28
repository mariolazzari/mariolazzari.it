// MUI components
import { makeStyles } from "@material-ui/core";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    minHeight: "100vh",
  },
}));

// component
const Hobbies = () => {
  // styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/images/wip.jpg" alt="WIP" />
    </div>
  );
};

export default Hobbies;
