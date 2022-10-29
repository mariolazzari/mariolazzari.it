import { useState } from "react";
import PropTypes from "prop-types";
// Mui components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
// MUI colors
import indigo from "@mui/material/colors/indigo";

// component
const CardMediaBox = props => {
  const [elevation, setElevation] = useState(10);

  const styles = {
    card: {
      margin: 2,
      maxWidth: props.width,
      border: `2px solid ${indigo[200]}`,
      "&:hover": {
        border: `2px solid ${indigo[400]}`,
        transform: "scale(1.1)",
      },
    },
    title: {
      fontWeight: "bold",
    },
    area: {
      height: props.areaHeight,
      overflow: "auto",
    },
  };

  const onCardClick = () => {
    props.onClick?.();
  };

  const onMouseEnter = () => {
    setElevation(20);
  };

  const onMouseLeave = () => {
    setElevation(10);
  };

  return (
    <Card
      sx={styles.card}
      elevation={elevation}
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.imageHeight}
          image={props.image}
          alt={props.title}
        />
        <CardContent sx={styles.area}>
          <Typography sx={styles.title} variant="h6" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>

      {props.actions.length > 0 && (
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

// default props
CardMediaBox.defaultProps = {
  width: 350,
  imageHeight: 250,
  areaHeight: 200,
  actions: [],
  onClick: null,
};

// mandatory props
CardMediaBox.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CardMediaBox;
