import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// MUI icons
import BackIcon from "@mui/icons-material/ArrowBack";

// component
const Back = props => {
  // routes
  const navigate = useNavigate();
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
      color="primary"
      variant={props.variant}
      onClick={() => navigate(-1)}
    >
      <BackIcon />
      {props.label}
    </Button>
  );
};

// default props
Back.defaultProps = {
  label: <FormattedMessage id="button.back" />,
  variant: "outlined",
};

export default Back;
