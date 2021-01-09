import { useState } from "react";
import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextBox from "../../components/TextBox";
import Button from "@material-ui/core/Button";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
//MUI icons
import SearchIcon from "@material-ui/icons/Search";
// components
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

  // on search change event handler
  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  // on clear search event handler
  const onClearSearch = () => {
    setSearch("");
  };

  // styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Avatar className={classes.avatar} src="/images/logos/nasa.png" />

      <TextBox
        className={classes.search}
        value={search}
        onChange={onSearchChange}
        onClear={onClearSearch}
        startIcon={<SearchIcon />}
      />

      <Box className={classes.buttons}>
        <Button className={classes.button} variant="contained" color="primary">
          <SearchIcon />
          <FormattedMessage id="nasa.search" />
        </Button>
        <Button className={classes.button} variant="outlined">
          <FormattedMessage id="button.lucky" />
        </Button>
      </Box>

      <Box className={classes.results}></Box>

      <Back className={classes.back} />
    </Box>
  );
};

export default Nasa;
