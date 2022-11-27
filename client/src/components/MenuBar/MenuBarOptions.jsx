import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";
// components
import options from "./options";

// component
const MenuBarOptions = () => {
  // navigation
  const location = useLocation();

  // styles
  const styles = {
    root: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    option: {
      margin: 1,
      textDecoration: "none",
      "&:hover": {
        color: yellow[500],
        fontWeight: "bold",
      },
    },
  };

  return (
    <Box sx={styles.root}>
      {options?.map(({ label, path }) => (
        <Typography
          key={path}
          sx={{
            ...styles.option,
            fontWeight: location.pathname === path ? "bold" : "",
          }}
          color="secondary"
          component={Link}
          to={path}
          variant="h6"
        >
          <FormattedMessage id={label} />
        </Typography>
      ))}
    </Box>
  );
};

export default MenuBarOptions;
