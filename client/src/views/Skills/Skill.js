import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI components
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// MUI icons
import LinkIcon from "@material-ui/icons/Link";

// styles
const useStyles = makeStyles(theme => ({
  paper: {},
}));

// component
const Skill = ({ selected }) => {
  const [elevation, setElevation] = useState(1);
  // styles
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      elevation={elevation}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
    >
      <Avatar />

      <Typography paragraph></Typography>
      <Typography paragraph></Typography>
      <LinkIcon />
    </Paper>
  );
};

Skill.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Skill;
