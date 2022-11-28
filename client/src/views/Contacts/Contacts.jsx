import { FormattedMessage } from "react-intl";
// Redux
import { useSelector } from "react-redux";
import { selectMail } from "redux/slices/socialSlice";
// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// component
import Meta from "components/Meta";
import Socials from "components/Socials";

//components
const Contacts = () => {
  // Redux
  const { mail, mailTo } = useSelector(selectMail);

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

  return (
    <Box sx={styles.root}>
      <Meta title="contacts.title" canonical="/contacts" />

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
