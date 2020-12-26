import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// MUI icons
import MenuIcon from "@material-ui/icons/Menu";
import IdeaIcon from "@material-ui/icons/EmojiObjects";

// component styles
const useStyles = makeStyles(theme => ({
  appBar: {
    display: "flex",
    justifyContent: "space-around",
    opacity: 0.9,
  },
  logo: {
    display: "flex",
    justifyContent: "space-around",
    color: "white",
  },
  logoIcon: {
    marginRight: theme.spacing(1),
  },
  options: {
    flex: 1,
  },
  icons: {},
}));

// component
const MenuBar = () => {
  // styles
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed" color="primary">
      <Toolbar>
        <Box className={classes.logo}>
          <IdeaIcon className={classes.logoIcon} />
          <Typography>
            <FormattedMessage id="menu.logo" />
          </Typography>
        </Box>

        <Box className={classes.options}></Box>

        <Box className={classes.icons}>
          <MenuIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
