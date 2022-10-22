// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, setLocale, setFlag } from "redux/slices/appSlice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// MUI icons
import MenuIcon from "@mui/icons-material/Menu";

// component
const MenuBarIcons = () => {
  // redux
  const { locale, open, flag } = useSelector(state => ({
    locale: state.app.locale,
    open: state.app.drawerOpen,
    flag: state.app.flag,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    root: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  };

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

  return (
    <Box className={styles.root}>
      <IconButton color="secondary" onClick={onFlagClick} size="large">
        <img
          src={`images/locales/${flag}.png`}
          alt={flag === "it" ? "Versione italiana" : "English version"}
          width={48}
          height={24}
        />
      </IconButton>

      <IconButton
        color="secondary"
        onClick={onMenuClick}
        aria-label="Menu"
        size="large"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default MenuBarIcons;
