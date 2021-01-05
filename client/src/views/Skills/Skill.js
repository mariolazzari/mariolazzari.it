import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// MUI components
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: theme.spacing(45),
    width: theme.spacing(45),
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    cursor: "pointer",
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  title: {
    fontWeight: "bold",
  },
}));

// component
const Skill = ({ selected, locale }) => {
  // state
  const [elevation, setElevation] = useState(1);
  const [text, setText] = useState("");
  const [use, setUse] = useState("");

  // show skill site
  const onClick = () => window.open(selected.url, "_blank");

  // styles
  const classes = useStyles();

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
      className={classes.paper}
      elevation={elevation}
      onClick={onClick}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
    >
      <Avatar
        className={classes.avatar}
        src={`/images/logos/${selected.imagePath}`}
        alt={selected.name}
        onClick={onClick}
      />

      <Typography
        className={classes.title}
        variant="h6"
        align="center"
        gutterBottom
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
