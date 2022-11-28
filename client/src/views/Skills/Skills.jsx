import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkills, selectSkills } from "redux/slices/skillSlice";
import Box from "@mui/material/Box";
// component
import Meta from "components/Meta";
import Section from "./Section";
import indigo from "@mui/material/colors/indigo";

// compoennt
const Skills = () => {
  // Redux
  const { locale, os, lang, db, ide, lib, tool } = useSelector(selectSkills);
  const dispatch = useDispatch();

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
    // get skills
    dispatch(getSkills());
  }, [dispatch]);

  return (
    <>
      <Meta title="skills.title" canonical="/skills" />

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
