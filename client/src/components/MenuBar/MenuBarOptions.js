import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";

// component
const MenuBarOptions = () => {
  // Redux
  const { options, selected } = useSelector(state => ({
    options: state.app.menuOptions,
    selected: state.app.selectedRoute,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    root: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    option: {
      margin: 1,
      textDecoration: "none",
      "&:hover": {
        color: yellow[500],
        fontWeight: "bold",
      },
    },
  };

  // on option click event handler
  const onClick = path => {
    dispatch(setSelectedRoute(path));
  };

  return (
    <Box sx={styles.root}>
      {options.map(({ label, path }) => (
        <Typography
          sx={styles.option}
          color="secondary"
          component={Link}
          key={path}
          style={{ fontWeight: selected === path ? "bold" : "" }}
          to={path}
          variant="h6"
          onClick={() => onClick(path)}
        >
          <FormattedMessage id={label} />
        </Typography>
      ))}
    </Box>
  );
};

export default MenuBarOptions;
