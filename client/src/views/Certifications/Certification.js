import { useState } from "react";
import PropTypes from "prop-types";
// Redux
import { useSelector } from "react-redux";
// MUI components
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// utilities
import { formatDistanceToNow } from "date-fns";

// compoennt styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(40),
  },
  title: {
    margin: theme.spacing(1),
    fontWeight: "bold",
  },
  image: {
    width: "100%",
  },
}));

// component
const Certification = ({ selected }) => {
  // state
  const [elevation, setElevation] = useState(1);
  // redux
  const { locale, dates } = useSelector(state => ({
    locale: state.app.locale,
    dates: state.app.dates,
  }));

  // dates options
  const options = {
    locale: dates.get(locale),
    includeSeconds: false,
    addSuffix: true,
  };

  // render date
  const renderDate = () => {
    const date = new Date(selected.date);
    return formatDistanceToNow(date, options);
  };

  // styles
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      elevation={elevation}
      onClick={() => window.open(selected.url, "_blank")}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
    >
      <Typography className={classes.title} gutterBottom>
        {selected.title}
      </Typography>
      <img
        className={classes.image}
        src={selected.imagePath}
        alt={selected.title}
      />
      <Typography>{renderDate()}</Typography>
    </Paper>
  );
};

// mandatory props
Certification.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Certification;
