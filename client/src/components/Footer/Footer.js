// MUI components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// styles
const useStyles = makeStyles(theme => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    fontWeight: "bold",
  },
}));

// component
const Footer = () => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Typography className={classes.text} variant="body1" color="secondary">
        Mario Lazzari &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
