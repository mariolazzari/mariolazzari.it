// MUI components
import makeStyles from '@mui/styles/makeStyles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// MUI icons
import ImageIcon from "@mui/icons-material/Image";
import VideoIcon from "@mui/icons-material/Videocam";
import ZoomIcon from "@mui/icons-material/ZoomIn";
// utils
import { format } from "date-fns";

import { indigo, red } from '@mui/material/colors';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(40),
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(50),
    },
    margin: theme.spacing(1),
  },
  media: {
    height: theme.spacing(25),
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(30),
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(40),
    },
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

  // render avatar
  const renderAvatar = () => {
    let backgroundColor, icon;

    if (selected.media_type === "image") {
      backgroundColor = indigo[500];
      icon = <ImageIcon />;
    } else {
      backgroundColor = red[500];
      icon = <VideoIcon />;
    }

    return <Avatar style={{ backgroundColor }}> {icon} </Avatar>;
  };

  // on click event handler
  const onClick = () => window.open(selected.url, "_blank");

  return (
    <Card className={classes.root} onClick={onClick} elevation={3}>
      <CardHeader
        avatar={renderAvatar()}
        title={
          <Typography className={classes.title} variant="body1" noWrap>
            {selected.title}
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
        <IconButton size="large">
          <ZoomIcon fontSize="small" color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NasaPod;
