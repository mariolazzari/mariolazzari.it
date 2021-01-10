import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// MUI icons
import SearchIcon from "@material-ui/icons/Search";

// styles
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// components
const Search = props => {
  // styles
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={props.variant}
      color="primary"
      type="submit"
    >
      <SearchIcon />
      {props.label}
    </Button>
  );
};

// default props
Search.defaultProps = {
  label: <FormattedMessage id="button.search" />,
  variant: "contained",
};

export default Search;
