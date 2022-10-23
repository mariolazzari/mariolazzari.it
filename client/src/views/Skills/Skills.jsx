import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "redux/slices/skillSlice";
import { setSelectedRoute } from "redux/slices/appSlice";
import Box from "@mui/material/Box";
// component
import Secton from "./Section";
import { indigo } from "@mui/material/colors";

// compoennt
const Skills = () => {
  // State
  const [title, setTitle] = useState("");
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
  const styles = {
    root: {
      padding: 1,
      backgroundColor: indigo[50],
    },
  };

  // load skills
  useEffect(() => {
    dispatch(setSelectedRoute("/skills"));
    window.scrollTo(0, 0);
    // set page title
    const homeTitle = intl.formatMessage({ id: "home.title" });
    const homeSubtitle = intl.formatMessage({ id: "home.subtitle" });
    const skillTitle = intl.formatMessage({ id: "skills.title" });
    setTitle(`${skillTitle} ${homeTitle} ${homeSubtitle}`);
    // get skills
    dispatch(getSkills());
  }, [dispatch, intl]);

  return (
    <Box sx={styles.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="https://mariolazzari.it/skills" />
        <meta name="description" content={title} />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      <Secton title="skills.lang" items={lang} locale={locale} />
      <Secton title="skills.ide" items={ide} locale={locale} />
      <Secton title="skills.os" items={os} locale={locale} />

      <Secton title="skills.db" items={db} locale={locale} />
      <Secton title="skills.libs" items={lib} locale={locale} />
      <Secton title="skills.tools" items={tool} locale={locale} />
    </Box>
  );
};

export default Skills;
