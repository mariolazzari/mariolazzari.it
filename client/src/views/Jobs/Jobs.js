// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

//styles
const useStyles = makeStyles(theme => ({
  root: {},
}));

// component
const Works = () => {
  // styles
  const classes = useStyles();

  return <Box className={classes.root}></Box>;
};

// component
export default Works;
