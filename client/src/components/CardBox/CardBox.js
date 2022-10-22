import { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 1,
      borderRadius: 1,
      minWidth: 40,
      minHeight: 55,
    },
    image: {
      margin: (2, 0),
    },
    title: {
      fontWeight: "bold",
    },
    text: {
      margin: 3,
    },
  };

  return (
    <Paper
      sx={styles.paper}
      elevation={elevation}
      onClick={onCardClick}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(1)}
      style={{ height: props.height || "auto" }}
    >
      {props.avatar && (
        <img
          sx={styles.image}
          src={props.avatar}
          alt={props.title}
          height={props.imageHeight}
          width={props.imageWidth}
        />
      )}

      {props.title && (
        <Typography sx={styles.title} variant="h4" align="center">
          <FormattedMessage id={props.title} />
        </Typography>
      )}

      {props.text && (
        <Typography sx={styles.text} align="justify">
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
