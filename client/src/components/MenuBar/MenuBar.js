import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
// components
import MenuBarOptions from "./MenuBarOptions";
import MenuBarIcons from "./MenuBarIcons";
import MenuDrawer from "./MenuDrawer";

// component+
const MenuBar = () => {
  // component styles
  const styles = {
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
      width: 32,
      height: 32,
    },
  };

  return (
    <AppBar sx={styles.appBar} position="fixed" color="primary">
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.logo} component={Link} to="/">
          <Avatar
            sx={styles.avatar}
            src="/images/logos/logo.png"
            alt="Mario Lazzari"
          />
        </Box>

        <Hidden mdDown>
          <Box sx={styles.options}>
            <MenuBarOptions />
          </Box>
        </Hidden>

        <Box sx={styles.icons}>
          <MenuBarIcons />
        </Box>
      </Toolbar>

      <MenuDrawer />
    </AppBar>
  );
};

export default MenuBar;
