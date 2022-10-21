import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const More = props => {
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
      component={Link}
      to={props.to}
    >
      {props.label}
    </Button>
  );
};

// default props
More.defaultProps = {
  label: <FormattedMessage id="button.more" />,
  variant: "outlined",
};

//mmandatry props
More.propTypes = {
  to: PropTypes.string.isRequired,
};

export default More;
