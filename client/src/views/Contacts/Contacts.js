import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
    minHeight: `calc(100vh - ${theme.spacing(8)})`,
  },
  title: {
    marginTop: theme.spacing(5),
  },
  image: {
    margin: theme.spacing(3, 0),
    "&:hover": {
      transform: "scale(1.1)",
    },
    minWidth: theme.spacing(15),
    maxWidth: theme.spacing(20),
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

  const intl = useIntl();

  // styles
  const classes = useStyles();

  // set route
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSelectedRoute("/contacts"));
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: "contacts.title" })}</title>
        <link rel="canonical" href="https://www.mariolazzari.it/contacts/" />
        <meta
          name="description"
          content={intl.formatMessage({ id: "contacts.title" })}
        />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      <Typography
        className={classes.title}
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
