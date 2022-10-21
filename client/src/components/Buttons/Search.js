import { FormattedMessage } from "react-intl";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
// MUI icons
import SearchIcon from "@mui/icons-material/Search";

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
