import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
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
  },
}));

// component
const GitHub = () => {
  // srtles
  const classes = useStyles();

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

      <Calendar username="mariolazzari" color="hsl(203, 82%, 33%)">
        <Tooltip delayShow={50} html />
      </Calendar>
    </Box>
  );
};

export default GitHub;
