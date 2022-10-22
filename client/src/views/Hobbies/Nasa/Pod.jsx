// MUI components
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
// MUI colors
import { indigo, red } from "@mui/material/colors";
// utils
import { format } from "date-fns";

// component
const Pod = ({ selected }) => {
  // styles
  const styles = {
    root: {
      margin: 1,
    },
    media: {
      height: 200,
      "&:hover": {
        cursor: "pointer",
      },
    },
    title: {
      fontWeight: "bold",
    },
    content: {
      width: 400,
      height: 300,
      overflow: "auto",
    },
  };

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
    <Card sx={styles.root} onClick={onClick} elevation={3}>
      <CardHeader
        avatar={renderAvatar()}
        title={
          <Typography sx={styles.title} variant="body1" noWrap>
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
        sx={styles.media}
        component={selected.media_type === "image" ? "img" : "iframe"}
        src={selected.url}
        title={selected.title}
      />

      <CardContent sx={styles.content}>
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

export default Pod;
