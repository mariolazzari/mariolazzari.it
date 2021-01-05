import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../actions/skillActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
// component
import Secton from "./Section";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10, 1),
    backgroundColor: indigo[50],
  },
}));

// compoennt
const Skills = () => {
  // Redux
  const { locale, os, lang, db, ide, lib, tool } = useSelector(state => ({
    locale: state.app.locale,
    os: state.skill.os,
    lang: state.skill.lang,
    db: state.skill.db,
    ide: state.skill.ide,
    lib: state.skill.lib,
    tool: state.skill.tool,
  }));
  const dispatch = useDispatch();

  //locales
  const intl = useIntl();

  // styles
  const classes = useStyles();

  // load skills
  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {intl.formatMessage({ id: "skills.title" }) +
            " - Mario Lazzari Fullstack Javascript Developer"}
        </title>
        <link rel="canonical" href="https://mariolazzari.it/skills" />
        <meta
          name="description"
          content={
            intl.formatMessage({ id: "skills.title" }) +
            " - Mario Lazzari Fullstack Javascript Developer"
          }
        />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      <Secton title="skills.os" items={os} locale={locale} />
      <Secton title="skills.lang" items={lang} locale={locale} />
      <Secton title="skills.db" items={db} locale={locale} />
      <Secton title="skills.ide" items={ide} locale={locale} />
      <Secton title="skills.libs" items={lib} locale={locale} />
      <Secton title="skills.tools" items={tool} locale={locale} />
    </Box>
  );
};

export default Skills;
