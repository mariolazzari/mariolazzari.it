import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// component
import Skill from "./Skill";

// component
const Section = props => {
  // styles
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: 5,
    },
    title: {
      marginBottom: 5,
      fontWeight: "bold",
    },
    skills: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
    },
  };

  return (
    <Box sx={styles.root}>
      <Typography
        sx={styles.title}
        variant="h3"
        color="primary"
        align="center"
        gutterBottom
      >
        <FormattedMessage id={props.title} />
      </Typography>

      <Box sx={styles.skills}>
        {props.items.length > 0 ? (
          props.items.map(item => (
            <Skill key={item._id} selected={item} locale={props.locale} />
          ))
        ) : (
          <Typography variantt="h3">Coming soon...</Typography>
        )}
      </Box>
    </Box>
  );
};

Section.propTypes = {
  locale: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Section;
