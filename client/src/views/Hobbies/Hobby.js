import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// MUI components
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// components
import { More } from "../../components/Buttons";

// style
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    height: theme.spacing(50),
    width: theme.spacing(50),
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.05)",
    },
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

// component
const Hobby = ({ selected }) => {
  // satte
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
      <Avatar
        className={classes.avatar}
        src={`/images/logos/${selected.imagePath}`}
      />

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
