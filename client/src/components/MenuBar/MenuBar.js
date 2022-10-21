import { Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
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
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

// component+
const MenuBar = () => {
  // styles
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed" color="primary">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo} component={Link} to="/">
          <Avatar
            className={classes.avatar}
            src="/images/logos/logo.png"
            alt="Mario Lazzari"
          />
        </Box>

        <Hidden mdDown>
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
