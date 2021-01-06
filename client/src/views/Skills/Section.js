import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
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
        {props.items.map(item => (
          <Skill key={item._id} selected={item} locale={props.locale} />
        ))}
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