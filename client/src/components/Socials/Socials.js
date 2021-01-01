import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSocials } from "../../actions/socialActions";
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
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
}));

// component
const Socials = () => {
  // Redux
  const { socials } = useSelector(state => ({
    socials: state.social.socials,
  }));
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();

  // load social accounts
  useEffect(() => {
    dispatch(getSocials());
  }, [dispatch]);

  return (
    <Box className={classes.box}>
      {socials.map((s, i) => (
        <Avatar
          key={i}
          className={classes.avatar}
          src={`/images/logos/${s.name}.png`}
          onClick={() => window.open(s.url, "_blank")}
        />
      ))}
    </Box>
  );
};

export default Socials;
