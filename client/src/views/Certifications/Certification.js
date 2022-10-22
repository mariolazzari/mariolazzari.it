import { useState } from "react";
import PropTypes from "prop-types";
// Redux
import { useSelector } from "react-redux";
// MUI components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
// utilities
import { formatDistanceToNow } from "date-fns";

// react env
const { NODE_ENV, REACT_APP_ROOT, REACT_APP_ROOT_DEV } = process.env;
const prefix = NODE_ENV === "production" ? REACT_APP_ROOT : REACT_APP_ROOT_DEV;

// component
const Certification = ({ selected }) => {
  // state
  const [elevation, setElevation] = useState(1);
  // redux
  const { locale, dates } = useSelector(state => ({
    locale: state.app.locale,
    dates: state.app.dates,
  }));

  // compoennt styles
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 1,
      borderRadius: 1,
      width: 410,
    },
    title: {
      margin: 1,
      fontWeight: "bold",
    },
  };

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
      sx={styles.paper}
      elevation={elevation}
      onClick={() => window.open(selected.url, "_blank")}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
    >
      <Typography sx={styles.title} variant="h6" align="center" gutterBottom>
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

      <Typography variant="body1">{renderDate()}</Typography>
    </Paper>
  );
};

// mandatory props
Certification.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Certification;
