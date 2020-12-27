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
// MUI icons
import MenuIcon from "@material-ui/icons/Menu";
import IdeaIcon from "@material-ui/icons/EmojiObjects";
// components
import Flag from "react-world-flags";

// component styles
const useStyles = makeStyles(theme => ({
  appBar: {
    display: "flex",
    justifyContent: "space-around",
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
  icons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: theme.spacing(8),
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
      <Toolbar>
        <Box className={classes.logo}>
          <IdeaIcon className={classes.logoIcon} />
          <Typography>
            <FormattedMessage id="menu.logo" />
          </Typography>
        </Box>

        <Box className={classes.options}></Box>

        <Box className={classes.icons}>
          <Flag
            code={locale === "it" ? "gb" : "it"}
            height={16}
            onClick={onClick}
          />
          <MenuIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
