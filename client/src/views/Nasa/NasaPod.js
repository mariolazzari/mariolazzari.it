// MUI components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
// MUI icons
import ImageIcon from "@material-ui/icons/Image";
import VideoIcon from "@material-ui/icons/Videocam";
import ZoomIcon from "@material-ui/icons/ZoomIn";
// utils
import { format } from "date-fns";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
    margin: theme.spacing(1),
  },
  media: {
    height: theme.spacing(25),
    "&:hover": {
      cursor: "pointer",
    },
  },
  avatar: {
    backgroundColor: indigo[600],
  },
  title: {
    width: theme.spacing(40),
    fontWeight: "bold",
  },
  content: {
    height: theme.spacing(25),
    overflow: "auto",
  },
}));

// component
const NasaPod = ({ selected }) => {
  // styles
  const classes = useStyles();

  // on click event handler
  const onClick = () => window.open(selected.url, "_blank");

  return (
    <Card className={classes.root} onClick={onClick} elevation={3}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor:
                selected.media_type === "image" ? indigo[500] : red[900],
            }}
          >
            {selected.media_type === "image" ? <ImageIcon /> : <VideoIcon />}
          </Avatar>
        }
        title={
          <Typography className={classes.title} variant="body1" noWrap>
            {selected?.title}
          </Typography>
        }
        subheader={
          <Typography variant="body1" align="justify">
            {selected ? format(new Date(selected.date), "d MMMM yyyy") : ""}
          </Typography>
        }
      />

      <CardMedia
        className={classes.media}
        component={selected.media_type === "image" ? "img" : "iframe"}
        src={selected.url}
        title={selected.title}
      />

      <CardContent className={classes.content}>
        <Typography variant="body2" align="justify">
          {selected.explanation}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <ZoomIcon fontSize="small" color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NasaPod;
