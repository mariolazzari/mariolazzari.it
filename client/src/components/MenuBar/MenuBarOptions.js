import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        <Link
          key={path}
          className={classes.option}
          to={path}
          onClick={() => onClick(path)}
        >
          <Typography
            color="secondary"
            style={{ fontWeight: selected === path ? "bold" : "" }}
            variant="h6"
          >
            <FormattedMessage id={label} />
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default MenuBarOptions;
