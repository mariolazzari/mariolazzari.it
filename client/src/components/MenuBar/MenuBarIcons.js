// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, setLocale } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// MUI icons
import MenuIcon from "@material-ui/icons/Menu";
import Flag from "react-world-flags";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
  },
}));

// component
const MenuBarIcons = () => {
  // redux
  const { locale, open } = useSelector(state => ({
    locale: state.app.locale,
    open: state.app.drawerOpen,
  }));
  const dispatch = useDispatch();

  // on flag icon click event handler
  const onFlagClick = () => {
    if (locale === "it") {
      dispatch(setLocale("en"));
    } else {
      dispatch(setLocale("it"));
    }
  };

  // on menu icon click event handler
  const onMenuClick = () => {
    if (open) {
      dispatch(setDrawerOpen(false));
    } else {
      dispatch(setDrawerOpen(true));
    }
  };

  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Flag
        className={classes.icon}
        code={locale === "it" ? "it" : "gb"}
        height={24}
        onClick={onFlagClick}
      />
      <MenuIcon
        className={classes.icon}
        color="secondary"
        onClick={onMenuClick}
      />
    </Box>
  );
};

export default MenuBarIcons;
