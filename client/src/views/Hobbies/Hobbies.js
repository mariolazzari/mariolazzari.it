// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
// component
import Hobby from "./Hobby";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: indigo[50],
    minHeight: "95vh",
    padding: theme.spacing(10, 1),
  },
  gird: {
    width: "100%",
  },
}));

// component
const Hobbies = () => {
  // styles
  const classes = useStyles();

  const hobbies = [{ title: "test" }];

  return (
    <Box className={classes.box}>
      <Grid className={classes.grid} container spacing={3}>
        {hobbies.map(hobby => (
          <Grid item container justify="center">
            <Hobby selected={hobby} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Hobbies;
