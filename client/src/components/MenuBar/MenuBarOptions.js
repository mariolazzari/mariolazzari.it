import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// MUI colors
import yellow from "@material-ui/core/colors/yellow";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  option: {
    margin: theme.spacing(1),
    textDecoration: "none",
    "&:hover": {
      color: yellow[500],
    },
  },
}));

// component
const MenuBarOptions = () => {
  // Redux
  const { options, selected } = useSelector(state => ({
    options: state.app.menuOptions,
    selected: state.app.selectedRoute,
  }));
  const dispatch = useDispatch();

  // on option click event handler
  const onClick = path => {
    dispatch(setSelectedRoute(path));
  };

  // styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {options.map(({ label, path }) => (
        <Typography
          className={classes.option}
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
    </div>
  );
};

export default MenuBarOptions;
