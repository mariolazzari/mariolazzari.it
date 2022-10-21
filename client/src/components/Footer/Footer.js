import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
