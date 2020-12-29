// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  avatar: {
    margin: theme.spacing(2),
    height: theme.spacing(10),
    width: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      height: theme.spacing(8),
      width: theme.spacing(8),
    },
  },
}));

// component
const Socials = () => {
  // socials to render
  const socials = [
    {
      imagePath: "linkedin",
      url: "https://www.linkedin.com/in/mario-lazzari",
    },
    {
      imagePath: "github",
      url: "https://github.com/mariolazzari",
    },

    {
      imagePath: "facebook",
      url: "https://www.facebook.com/mario.v.lazzari",
    },
    {
      imagePath: "instagram",
      url: "https://www.instagram.com/mario.lazzari75",
    },
    {
      imagePath: "twitter",
      url: "https://twitter.com/MarioLazzari2",
    },
  ];

  // styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      {socials.map((s, i) => (
        <Avatar
          key={i}
          className={classes.avatar}
          src={`/images/logos/${s.imagePath}.png`}
          onClick={() => window.open(s.url, "_blank")}
        />
      ))}
    </Box>
  );
};

export default Socials;
