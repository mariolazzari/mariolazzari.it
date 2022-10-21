import { FormattedMessage } from "react-intl";
// MUI components
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// components
import Calendar from "react-github-calendar";
import Tooltip from "react-tooltip";

// component
const GitHub = () => {
  // styles
  const theme = useTheme();
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      padding: 1,
    },
    title: {
      marginTop: 2,
      fontWeight: "bold",
    },
  };

  return (
    <Box sx={styles.root}>
      <Typography
        sx={styles.title}
        variant="h3"
        align="center"
        color="primary"
        gutterBottom
      >
        <FormattedMessage id="home.github" />
      </Typography>

      <Calendar username="mariolazzari" color={theme.palette.primary.main}>
        <Tooltip delayShow={50} html />
      </Calendar>
    </Box>
  );
};

export default GitHub;
