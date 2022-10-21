import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Back = props => {
  // routes
  const navigate = useNavigate();
  // styles
  const styles = {
    button: {
      margin: 1,
    },
  };

  return (
    <Button
      sx={styles.button}
      color="primary"
      variant={props.variant}
      onClick={() => navigate(-1)}
    >
      {props.label}
    </Button>
  );
};

// default props
Back.defaultProps = {
  label: <FormattedMessage id="button.back" />,
  variant: "contained",
};

export default Back;
