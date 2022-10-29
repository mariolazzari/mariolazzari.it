import { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
// MUI components
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// MUI colors
import indigo from "@mui/material/colors/indigo";
// components
import { More } from "components/Buttons";

// component
const Hobby = ({ selected }) => {
  // state
  const [elevation, setElevation] = useState(10);

  // navigation
  const navigate = useNavigate();

  // styles
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 2,
      padding: 2,
      height: 400,
      width: 380,
      border: `2px solid ${indigo[200]}`,
      "&:hover": {
        transform: "scale(1.1)",
        border: `2px solid ${indigo[400]}`,
      },
    },
    avatar: {
      width: 60,
      height: 60,
      marginY: 1,
    },
    text: {
      marginBottom: "auto",
    },
  };

  return (
    <Paper
      sx={styles.paper}
      elevation={elevation}
      onMouseEnter={() => setElevation(20)}
      onMouseLeave={() => setElevation(10)}
      onClick={() => navigate(selected.to)}
    >
      <Avatar sx={styles.avatar} src={`/images/logos/${selected.imagePath}`} />

      <>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id={selected.title} />
        </Typography>

        <Typography sx={styles.text} variant="body1" align="justify" paragraph>
          <FormattedMessage id={selected.description} />
        </Typography>
      </>

      <More />
    </Paper>
  );
};

// mandatory props
Hobby.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Hobby;
