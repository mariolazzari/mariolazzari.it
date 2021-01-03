// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";

// styles
const useStyles = makeStyles(theme => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(8),
    backgroundColor: indigo[800],
  },
  image: {
    height: theme.spacing(5),
  },
}));

// component
const Footer = () => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <img
        className={classes.image}
        src="/images/logos/linux.png"
        alt="Powered by Linux"
      />
    </Box>
  );
};

export default Footer;
