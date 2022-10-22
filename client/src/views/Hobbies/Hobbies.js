import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
// MUI components
import Box from "@mui/material/Box";
// component
import Hobby from "./Hobby";
import { indigo } from "@mui/material/colors";

// component
const Hobbies = () => {
  // locales
  const intl = useIntl();

  // styles
  const styles = {
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: indigo[50],
      minHeight: "95vh",
      padding: 5,
      borderRadius: 1,
    },
  };

  const hobbies = [
    {
      id: 1,
      title: "hobbies.nasaTitle",
      description: "hobbies.nasaDesc",
      imagePath: "nasa.png",
    },
  ];

  return (
    <Box sx={styles.box}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: "hobbies.title" })}</title>
        <link rel="canonical" href="https://www.mariolazzari.it/hobbies/" />
        <meta
          name="description"
          content={intl.formatMessage({ id: "hobbies.title" })}
        />
        <meta
          name="keywords"
          content="hobby programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      {hobbies.map(hobby => (
        <Hobby key={hobby.id} selected={hobby} />
      ))}
    </Box>
  );
};

export default Hobbies;
