import { useState } from "react";
import PropTypes from "prop-types";
// Redux
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
// utilities
import { formatDistanceToNow } from "date-fns";

// react env
const { NODE_ENV, REACT_APP_ROOT, REACT_APP_ROOT_DEV } = process.env;

const prefix = NODE_ENV === "production" ? REACT_APP_ROOT : REACT_APP_ROOT_DEV;

// compoennt styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
  },
  title: {
    margin: theme.spacing(1),
    fontWeight: "bold",
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
  // styles
  const classes = useStyles();

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

  return (
    <Paper
      className={classes.paper}
      elevation={elevation}
      onClick={() => window.open(selected.url, "_blank")}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
    >
      <Typography className={classes.title} align="center" gutterBottom>
        {selected.title}
      </Typography>

      <Fade in timeout={1000}>
        <img
          src={`${prefix}${selected.imagePath}`}
          alt={selected.title}
          width={400}
          height={298}
        />
      </Fade>

      <Typography>{renderDate()}</Typography>
    </Paper>
  );
};

// mandatory props
Certification.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Certification;
