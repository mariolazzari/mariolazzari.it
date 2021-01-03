import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../actions/skillActions";
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            variant="h3"
            color="primary"
            align="center"
            gutterBottom
          >
            <FormattedMessage id="skills.os" />
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify="center"
        alignItems="center"
        wrap="wrap"
        xs={12}
      >
        {os.map(skill => (
          <Skill locale={locale} selected={skill} />
        ))}
      </Grid>

      <Grid item xs={!2}>
        <Typography
          className={classes.title}
          variant="h3"
          color="primary"
          gutterBottom
        >
          <FormattedMessage id="skills.lang" />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant="h3"
          color="primary"
          gutterBottom
        >
          <FormattedMessage id="skills.db" />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant="h3"
          color="primary"
          gutterBottom
        >
          <FormattedMessage id="skills.ide" />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant="h3"
          color="primary"
          gutterBottom
        >
          <FormattedMessage id="skills.libs" />
        </Typography>
      </Grid>
    </Box>
  );
};

export default Skills;
