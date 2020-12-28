// MUI components
import { makeStyles } from "@material-ui/core";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";

// styles
const useStyles = makeStyles(theme => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(10),
    backgroundColor: indigo[800],
  },
}));

// component
const Footer = () => {
  // styles
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <img src="/images/logos/linuxPower.png" alt="Mario Lazzari" height={50} />
    </div>
  );
};

export default Footer;
