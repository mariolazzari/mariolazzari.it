import { useState } from "react";
import PropTypes from "prop-types";
// MUI components
import { makeStyles } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
  },
}));

// component
const CardBox = props => {
  // state
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
      {props.avatar && <Avatar src={props.avatar} />}
      <Typography variant="h4" align="center">
        {props.title}
      </Typography>

      <Typography variant="h6" align="center">
        {props.text}
      </Typography>
    </Paper>
  );
};

// mandatory props
CardBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CardBox;
