import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../actions/skillActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: indigo[50],
  },
  title: {
    marginTop: theme.spacing(10),
  },
}));

const Skills = () => {
  // Redux
  const { locale, os } = useSelector(state => ({
    locale: state.app.locale,
    os: state.skill.os,
  }));
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();

  // load skills
  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

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

      {os.map(skill => (
        <Skill selected={skill} locale={locale} />
      ))}

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
