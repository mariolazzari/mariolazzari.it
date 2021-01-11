import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getNasaPods } from "../../actions/nasaActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextBox from "../../components/TextBox";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
//MUI icons
import SearchIcon from "@material-ui/icons/Search";
// components
import { Back, Options, Search } from "../../components/Buttons";
import NasaPod from "./NasaPod";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: indigo[50],
    padding: theme.spacing(10, 1),
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  search: {
    maxWidth: theme.spacing(100),
    margin: theme.spacing(3, 0),
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1, 0),
  },
  results: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    minHeight: "50vh",
  },
  back: {
    alignSelf: "flex-start",
  },
}));

// components
const Nasa = () => {
  // state
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  // redux
  const { today, pods, loading } = useSelector(state => ({
    today: state.nasa.podToday,
    pods: state.nasa.pods,
    lodaing: state.nasa.podsLoading,
  }));
  const dispatch = useDispatch();

  // on search change event handler
  const onSearchChange = e => setSearch(e.target.value);
  // on clear search event handler
  const onClearSearch = () => setSearch("");

  // on form submit
  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(getNasaPods(search));
  };

  // on options click event handler
  const onOptionsClick = () => {};

  // styles
  const classes = useStyles();

  // load today pic
  useEffect(() => {
    dispatch(getNasaPods(search));
  }, [dispatch, search]);

  return (
    <form className={classes.box} onSubmit={onFormSubmit}>
      <Backdrop open={loading} />
      <Avatar className={classes.avatar} src="/images/logos/nasa.png" />
      <TextBox
        className={classes.search}
        value={search}
        onChange={onSearchChange}
        onClear={onClearSearch}
        startIcon={<SearchIcon />}
        required={false}
      />
      <Box className={classes.buttons}>
        <Search />
        <Options onClick={onOptionsClick} />
      </Box>

      <Typography variant="body1">
        {pods.length > 0
          ? "Risultati trovati: " + pods.length
          : "Foto del giorno"}
      </Typography>

      <Box className={classes.results}>
        {pods.length > 0 ? (
          pods.map(pod => <NasaPod selected={pod} />)
        ) : today ? (
          <NasaPod selected={today} />
        ) : null}
      </Box>

      <Back className={classes.back} />
    </form>
  );
};

export default Nasa;
