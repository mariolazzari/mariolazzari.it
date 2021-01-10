// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
// component
import Hobby from "./Hobby";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: indigo[50],
    minHeight: "94vh",
    padding: theme.spacing(11, 1),
    borderRadius: theme.spacing(1),
  },
}));

// component
const Hobbies = () => {
  // styles
  const classes = useStyles();

  const hobbies = [
    {
      title: "hobbies.nasaTitle",
      description: "hobbies.nasaDesc",
      imagePath: "nasa.png",
    },
  ];

  return (
    <Box className={classes.box}>
      {hobbies.map(hobby => (
        <Hobby selected={hobby} />
      ))}
    </Box>
  );
};

export default Hobbies;
