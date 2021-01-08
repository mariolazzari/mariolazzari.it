// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: indigo[50],
    minHeight: "95vh",
  },
  gird: {
    width: "100%",
  },
}));

// component
const Hobbies = () => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid className={classes.grid} container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Hobbies;
