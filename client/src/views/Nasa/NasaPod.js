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
import indigo from "@material-ui/core/colors/indigo";
import LinkIcon from "@material-ui/icons/Link";
// utils
import { format } from "date-fns";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: indigo[600],
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

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {selected.title.substring(0, 1)}
          </Avatar>
        }
        title={<Typography variant="h6">{selected.title}</Typography>}
        subheader={
          <Typography variant="body1" align="justify">
            {format(new Date(selected.date), "d MMMM yyyy")}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={selected.url}
        title={selected.title}
      />
      <CardContent className={classes.content}>
        <Typography variant="body1">{selected.explanation}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => window.open(selected.hdurl, "_blank")}>
          <LinkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NasaPod;
