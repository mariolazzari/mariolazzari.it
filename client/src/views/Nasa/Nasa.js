import { useState } from "react";
import { FormattedMessage } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getNasaPods } from "../../actions/nasaActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextBox from "../../components/TextBox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
//MUI icons
import SearchIcon from "@material-ui/icons/Search";
// components
import NasaPod from "./NasaPod";
import { Back } from "../../components/Buttons";

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
  button: {
    margin: theme.spacing(1),
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
  // redux
  const { pods, lodaing } = useSelector(state => ({
    pods: state.nasa.pods,
    lodaing: state.nasa.podsLoading,
  }));
  const dispatch = useDispatch();

  // on search change event handler
  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  // on clear search event handler
  const onClearSearch = () => {
    setSearch("");
  };

  // on form submit
  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(getNasaPods(search));
  };

  // styles
  const classes = useStyles();

  return (
    <form className={classes.box} onSubmit={onFormSubmit}>
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
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <SearchIcon />
          <FormattedMessage id="nasa.search" />
        </Button>
        <Button className={classes.button} variant="outlined">
          <FormattedMessage id="button.lucky" />
        </Button>
      </Box>

      {pods.length > 0 && (
        <Typography variant="body1">
          Risultati trovati: {pods.length}
        </Typography>
      )}

      <Box className={classes.results}>
        {pods.map(pod => (
          <NasaPod selected={pod} />
        ))}
      </Box>

      <Back className={classes.back} />
    </form>
  );
};

export default Nasa;
