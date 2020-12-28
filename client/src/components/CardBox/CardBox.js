import { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
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
  image: {
    margin: theme.spacing(2, 0),
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    margin: theme.spacing(3),
  },
}));

// component
const CardBox = props => {
  // state
  const [elevation, setElevation] = useState(1);

  // on card click
  const onCardClick = () => {
    if (props.onCardClick) {
      props.onCardClick();
    }
  };

  // styles
  const classes = useStyles(props.height);

  return (
    <Paper
      className={classes.paper}
      elevation={elevation}
      onClick={onCardClick}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
      style={{ height: props.height || "auto" }}
    >
      {props.avatar && (
        <img
          className={classes.image}
          src={props.avatar}
          alt={props.title}
          height={props.imageHeight || 75}
        />
      )}

      {props.title && (
        <Typography className={classes.title} variant="h4" align="center">
          <FormattedMessage id={props.title} />
        </Typography>
      )}

      {props.text && (
        <Typography className={classes.text} align="justify">
          <FormattedMessage id={props.text} />
        </Typography>
      )}
    </Paper>
  );
};

// mandatory props
CardBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CardBox;
