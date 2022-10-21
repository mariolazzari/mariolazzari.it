import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
// MUI icons
import SearchIcon from "@mui/icons-material/Search";

// components
const Search = props => {
  // styles
  const styles = {
    button: {
      margin: 1,
    },
  };

  return (
    <Button
      sx={styles.button}
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
