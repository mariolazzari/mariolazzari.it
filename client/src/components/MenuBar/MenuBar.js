import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
// MUI icons
import IdeaIcon from "@material-ui/icons/EmojiObjects";
// components
import MenuBarOptions from "./MenuBarOptions";
import MenuBarIcons from "./MenuBarIcons";

// component styles
const useStyles = makeStyles(theme => ({
  appBar: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
  },
}));

// component
const MenuBar = () => {
  // Redux
  const { locale } = useSelector(state => ({
    locale: state.app.locale,
  }));
  const dispatch = useDispatch();

  // on flag click event handler
  const onClick = () => {
    if (locale === "it") {
      dispatch(setLocale("en"));
    } else {
      dispatch(setLocale("it"));
    }
  };

  // styles
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed" color="primary">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo}>
          <IdeaIcon className={classes.logoIcon} />
          <Typography>
            <FormattedMessage id="menu.logo" />
          </Typography>
        </Box>

        <Hidden smDown>
          <Box className={classes.options}>
            <MenuBarOptions />
          </Box>
        </Hidden>

        <Box className={classes.icons}>
          <MenuBarIcons />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
