// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, setLocale, setFlag } from "../../actions/appActions";
// MUI components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
// MUI icons
import MenuIcon from "@material-ui/icons/Menu";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

// component
const MenuBarIcons = () => {
  // redux
  const { locale, open, flag } = useSelector(state => ({
    locale: state.app.locale,
    open: state.app.drawerOpen,
    flag: state.app.flag,
  }));
  const dispatch = useDispatch();

  // on flag icon click event handler
  const onFlagClick = () => {
    if (locale === "en") {
      dispatch(setLocale("it"));
      dispatch(setFlag("it"));
    } else {
      dispatch(setLocale("en"));
      dispatch(setFlag("en"));
    }
  };

  // on menu icon click event handler
  const onMenuClick = () => dispatch(setDrawerOpen(!open));

  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <IconButton color="secondary" onClick={onFlagClick}>
        <img
          src={flag}
          alt={flag === "it" ? "Versione italiana" : "English version"}
          width={48}
          height={24}
        />
      </IconButton>

      <IconButton color="secondary" onClick={onMenuClick} aria-label="Menu">
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default MenuBarIcons;
