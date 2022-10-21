import { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import makeStyles from '@mui/styles/makeStyles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(40),
    minHeight: theme.spacing(55),
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
          height={props.imageHeight}
          width={props.imageWidth}
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

// default props
CardBox.defaultProps = {
  imageHeight: 75,
  imageWidth: 75,
};

// mandatory props
CardBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CardBox;
