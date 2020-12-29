import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, setSelectedRoute } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";

// styles
const useStyles = makeStyles(theme => ({
  paper: {
    color: indigo[50],
    backgroundColor: indigo[800],
  },
  avatar: {
    margin: theme.spacing(1, "auto"),
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  list: {
    width: theme.spacing(25),
  },
  link: {
    textDecoration: "none",
    color: indigo[50],
    fontWeight: "bold",
  },
  label: {
    marginLeft: -theme.spacing(2),
  },
}));

// component
const MenuDrawer = () => {
  // redux
  const { open, options, selected } = useSelector(state => ({
    open: state.app.drawerOpen,
    options: state.app.menuOptions,
    selected: state.app.selectedRoute,
  }));
  const dispatch = useDispatch();

  // on drawer item click
  const onItemClick = path => {
    dispatch(setSelectedRoute(path));
    dispatch(setDrawerOpen(false));
  };

  // styles
  const classes = useStyles();

  return (
    <SwipeableDrawer
      className={classes.drawer}
      open={open}
      onOpen={() => dispatch(setDrawerOpen(true))}
      onClose={() => dispatch(setDrawerOpen(false))}
      anchor="right"
      classes={{ paper: classes.paper }}
    >
      <Avatar className={classes.avatar} src="/images/logos/logo.png" />
      <Divider />
      <List className={classes.list}>
        {options.map(o => (
          <ListItem
            className={classes.link}
            component={Link}
            key={o.path}
            onClick={() => onItemClick(o.path)}
            to={o.path}
            selected={o.path === selected}
          >
            <ListItemIcon>{o.icon}</ListItemIcon>
            <ListItemText
              className={classes.label}
              primary={<FormattedMessage id={o.label} />}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
