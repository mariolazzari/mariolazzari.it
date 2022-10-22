import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// component
import Socials from "../../components/Socials";

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
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 1,
      minHeight: "95vh",
    },
    title: {
      marginTop: 5,
    },
    social: {
      marginY: 5,
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        fontWeight: "bold",
        textDecoration: "underline",
        transform: "scale(1.1)",
      },
    },
  };

  // set route
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSelectedRoute("/contacts"));
  }, [dispatch]);

  return (
    <Box sx={styles.root}>
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
        sx={styles.title}
        variant="h4"
        color="primary"
        gutterBottom
        align="center"
      >
        <FormattedMessage id="contacts.mail" />
      </Typography>

      <Typography
        sx={styles.link}
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
        src="/images/logos/gmail.png"
        alt={mail}
        onClick={() => window.open(mailTo)}
      />

      <Typography
        sx={styles.social}
        variant="h4"
        color="primary"
        gutterBottom
        align="center"
      >
        <FormattedMessage id="contacts.social" />
      </Typography>

      <Socials size={96} />
    </Box>
  );
};

export default Contacts;
