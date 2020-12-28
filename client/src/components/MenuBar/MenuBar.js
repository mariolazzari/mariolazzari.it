import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
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
import { child } from "winston";

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
  // navigation history
  const history = useHistory();

  // goto homepage
  const onLogoClick = () => {
    console.log("object", history);
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
