import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// component
import Skill from "./Skill";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  skills: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
}));

// component
const Section = props => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        align="center"
      >
        <FormattedMessage id={props.title} />
      </Typography>

      <Box className={classes.skills}>
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
