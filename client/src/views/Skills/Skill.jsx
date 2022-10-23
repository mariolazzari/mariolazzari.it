import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// component
const Skill = ({ selected, locale }) => {
  // state
  const [elevation, setElevation] = useState(10);
  const [text, setText] = useState("");
  const [use, setUse] = useState("");

  // show skill site
  const onClick = () => {
    window.open(selected.url, "_blank");
  };

  // styles
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 400,
      width: 400,
      margin: 2,
      padding: 2,
      borderRadius: 2,
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.1)",
        margin: 1,
      },
    },
    avatar: {
      height: 64,
      width: 64,
      marginBottom: 2,
    },
    title: {
      fontWeight: "bold",
    },
  };

  // init component
  useEffect(() => {
    if (locale) {
      const desc = selected.description.find(t => t.locale === locale);
      if (desc) {
        setText(desc.text);
      }
      const use = selected.useCase.find(t => t.locale === locale);
      if (use) {
        setUse(use.text);
      }
    }
  }, [locale, selected.description, selected.useCase]);

  return (
    <Paper
      sx={styles.paper}
      elevation={elevation}
      onClick={onClick}
      onMouseEnter={() => setElevation(20)}
      onMouseLeave={() => setElevation(10)}
    >
      <Avatar
        sx={styles.avatar}
        src={`/images/logos/${selected.imagePath}`}
        alt={selected.name}
        onClick={onClick}
      />

      <Typography
        sx={styles.title}
        variant="h5"
        align="center"
        gutterBottom
        component="a"
      >
        {selected.name}
      </Typography>

      <Typography variant="body2" paragraph align="justify">
        {text}
      </Typography>

      <Typography variant="body2" paragraph align="justify">
        {use}
      </Typography>
    </Paper>
  );
};

Skill.propTypes = {
  locale: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
};

export default Skill;
