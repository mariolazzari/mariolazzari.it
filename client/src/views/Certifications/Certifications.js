import { useEffect } from "react";
// MUI components
import { makeStyles } from "@material-ui/core";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "white",
  },
}));

// component
const Certifications = () => {
  // styles
  const classes = useStyles();

  // init page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <img src="/images/wip.jpg" alt="WIP" width={300} />
    </div>
  );
};

export default Certifications;
