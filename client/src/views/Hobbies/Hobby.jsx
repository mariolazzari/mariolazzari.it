import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
// MUI components
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// components
import { More } from "../../components/Buttons";

// component
const Hobby = ({ selected }) => {
  // satte
  const [elevation, setElevation] = useState(10);

  // styles
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 1,
      height: 400,
      width: 400,
    },
    avatar: {
      width: 60,
      height: 60,
    },
  };

  return (
    <Paper
      sx={styles.paper}
      elevation={elevation}
      onMouseEnter={() => setElevation(20)}
      onMouseLeave={() => setElevation(10)}
    >
      <Avatar sx={styles.avatar} src={`/images/logos/${selected.imagePath}`} />

      <Fragment>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id={selected.title} />
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          <FormattedMessage id={selected.description} />
        </Typography>
      </Fragment>

      <More to="/nasa" />
    </Paper>
  );
};

// mandatory props
Hobby.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Hobby;
