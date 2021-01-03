import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    minHeight: `calc(100vh - ${theme.spacing(8)}px)`,
    backgroundColor: indigo[50],
  },
  title: {
    marginTop: theme.spacing(5),
  },
}));

const Skills = () => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="skills.os" />
      </Typography>

      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="skills.lang" />
      </Typography>

      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="skills.db" />
      </Typography>

      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="skills.ide" />
      </Typography>

      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="skills.libs" />
      </Typography>
    </Box>
  );
};

export default Skills;
