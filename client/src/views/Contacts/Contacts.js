import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// component
import Socials from "../../components/Socials";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    minHeight: `calc(100vh - 80px)`,
  },
  title: {
    marginTop: theme.spacing(5),
  },
  image: {
    margin: theme.spacing(3, 0),
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
      transform: "scale(1.1)",
    },
  },
}));

//components
const Contacts = () => {
  // Redux
  const { mail, mailTo } = useSelector(state => ({
    mail: state.social.mail,
    mailTo: state.social.mailTo,
  }));
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();

  // set route
  useEffect(() => {
    dispatch(setSelectedRoute("/contacts"));
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.tite}
        variant="h4"
        color="primary"
        gutterBottom
        align="center"
      >
        <FormattedMessage id="contacts.mail" />
      </Typography>

      <Typography
        className={classes.link}
        component="a"
        href={mailTo}
        target="_blank"
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
      >
        {mail}
      </Typography>

      <img
        className={classes.image}
        src="/images/logos/gmail.png"
        alt={mail}
        onClick={() => window.open(mailTo)}
      />

      <Typography variant="h4" color="primary" gutterBottom align="center">
        <FormattedMessage id="contacts.social" />
      </Typography>

      <Socials />
    </Box>
  );
};

export default Contacts;
