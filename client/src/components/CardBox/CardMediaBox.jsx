import PropTypes from "prop-types";
// Mui components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

// component
const CardMediaBox = props => {
  const styles = {
    card: {
      maxWidth: props.width,
    },
  };

  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.imageHeight}
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

// default props
CardMediaBox.defaultProps = {
  maxWidth: 350,
  imageHeight: 250,
};

// mandatory props
CardMediaBox.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CardMediaBox;
