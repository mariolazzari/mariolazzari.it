import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// components
import Calendar from "react-github-calendar";
import Tooltip from "react-tooltip";

// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
  },
}));

// component
const GitHub = () => {
  // styles
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.title}
        variant="h3"
        gutterBottom
        align="center"
        color="primary"
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
