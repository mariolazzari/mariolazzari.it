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
      width: 120,
    },
  };

  return (
    <Button
      sx={styles.button}
      variant={props.variant}
      color="primary"
      type="submit"
      disabled={props.disabled}
    >
      <SearchIcon />
      {props.label}
    </Button>
  );
};

// default props
Search.defaultProps = {
  disabled: false,
  label: <FormattedMessage id="button.search" />,
  variant: "contained",
};

export default Search;
