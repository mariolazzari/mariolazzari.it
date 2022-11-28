import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "redux/slices/appSlice";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { indigo, yellow } from "@mui/material/colors";
// options
import options from "./options";

// component
const MenuDrawer = () => {
  // redux
  const { open } = useSelector(state => ({
    open: state.app.drawerOpen,
  }));
  const dispatch = useDispatch();

  // navigation
  const location = useLocation();

  // styles
  const styles = {
    drawer: {
      color: indigo[50],
      backgroundColor: indigo[800],
    },
    avatar: {
      marginX: "auto",
      marginY: 2,
      height: 48,
      width: 48,
    },
    list: {
      width: 250,
    },
    link: {
      textDecoration: "none",
      color: indigo[50],
      fontWeight: "bold",
      "&:hover": {
        color: yellow[500],
      },
    },
    label: {
      marginLeft: -2,
    },
  };

  // on drawer item click
  const onItemClick = () => {
    dispatch(setDrawerOpen(false));
  };

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: styles.drawer,
      }}
      open={open}
      onOpen={() => dispatch(setDrawerOpen(true))}
      onClose={() => dispatch(setDrawerOpen(false))}
      anchor="right"
    >
      <Avatar
        sx={styles.avatar}
        src="/images/logos/logo.png"
        alt="Mario Lazzari"
      />
      <Divider />
      <List sx={styles.list}>
        {options.map(o => (
          <ListItem
            sx={styles.link}
            component={Link}
            key={o.path}
            onClick={onItemClick}
            to={o.path}
            selected={o.path === location.pathname}
          >
            <ListItemIcon>{o.icon}</ListItemIcon>
            <ListItemText
              sx={styles.label}
              primary={<FormattedMessage id={o.label} />}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
