import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
// MUI icons
import OptionIcon from "@mui/icons-material/Settings";

const Options = props => {
  // styles
  const styles = {
    button: {
      margin: 1,
    },
  };

  // pm click event handler
  const onClick = () => {
    props.onClick?.();
  };

  return (
    <Button
      sx={styles.button}
      variant={props.variant}
      color="primary"
      onClick={onClick}
    >
      <OptionIcon />
      {props.label}
    </Button>
  );
};

// default props
Options.defaultProps = {
  label: <FormattedMessage id="button.options" />,
  variant: "outlined",
};

//mmandatry props
Options.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Options;
