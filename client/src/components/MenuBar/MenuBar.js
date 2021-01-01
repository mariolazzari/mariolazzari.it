import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
// MUI components
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
// components
import MenuBarOptions from "./MenuBarOptions";
import MenuBarIcons from "./MenuBarIcons";
import MenuDrawer from "./MenuDrawer";

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
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  },
}));

// component+
const MenuBar = () => {
  // navigation history
  const history = useHistory();

  // goto homepage
  const onLogoClick = () => {
    history.push("/");
  };

  // styles
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed" color="primary">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo} onClick={onLogoClick}>
          <Avatar
            className={classes.avatar}
            src="/images/logos/logo.png"
            alt="Mario Lazzari"
          />
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

      <MenuDrawer />
    </AppBar>
  );
};

export default MenuBar;
