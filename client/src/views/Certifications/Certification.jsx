import { useState } from "react";
import PropTypes from "prop-types";
// Redux
import { useSelector } from "react-redux";
// MUI components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
// utilities
import { renderDate } from "utils/dates";

// react env
const { NODE_ENV, REACT_APP_ROOT, REACT_APP_ROOT_DEV } = process.env;
const prefix = NODE_ENV === "production" ? REACT_APP_ROOT : REACT_APP_ROOT_DEV;

// component
const Certification = ({ selected }) => {
  // state
  const [elevation, setElevation] = useState(10);
  // redux
  const { locale } = useSelector(state => ({
    locale: state.app.locale,
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
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    title: {
      margin: 1,
      fontWeight: "bold",
      maxWidth: 350,
    },
  };

  const onPaperClick = () => {
    window.open(selected.url, "_blank");
  };

  return (
    <Paper
      sx={styles.paper}
      elevation={elevation}
      onClick={onPaperClick}
      onMouseEnter={() => setElevation(20)}
      onMouseLeave={() => setElevation(10)}
    >
      <Typography
        sx={styles.title}
        variant="h6"
        align="center"
        gutterBottom
        noWrap
      >
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

      <Typography variant="body1">
        {renderDate(selected.date, locale)}
      </Typography>
    </Paper>
  );
};

// mandatory props
Certification.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Certification;
