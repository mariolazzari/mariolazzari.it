import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills, selectSkills } from "redux/slices/skillSlice";
import Box from "@mui/material/Box";
// component
import Section from "./Section";
import { indigo } from "@mui/material/colors";

// compoennt
const Skills = () => {
  // State
  const [title, setTitle] = useState("");
  // Redux
  const { locale, os, lang, db, ide, lib, tool } = useSelector(selectSkills);
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

  // sections to render
  const sections = [
    { title: "lang", items: lang },
    { title: "ide", items: ide },
    { title: "os", items: os },
    { title: "db", items: db },
    { title: "libs", items: lib },
    { title: "tools", items: tool },
  ];

  // load skills
  useEffect(() => {
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
    <>
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

      <Box sx={styles.root}>
        {sections.map(s => (
          <Section
            key={s.title}
            title={`skills.${s.title}`}
            items={s.items}
            locale={locale}
          />
        ))}
      </Box>
    </>
  );
};

export default Skills;
