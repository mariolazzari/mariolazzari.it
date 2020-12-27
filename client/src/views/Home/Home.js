import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// MUI colors
import { indigo } from "@material-ui/core/colors";
// component
import CardBox from "../../components/CardBox";

// component styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: indigo[50],
    padding: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(8),
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "bold",
  },
  intro: {
    margin: theme.spacing(1, "10%"),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// component
const Home = () => {
  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.title}
        variant="h1"
        color="primary"
        align="center"
      >
        <FormattedMessage id="home.title" />
      </Typography>

      <Typography
        className={classes.subtitle}
        variant="h2"
        color="primary"
        align="center"
        gutterBottom
      >
        <FormattedMessage id="home.subtitle" />
      </Typography>

      <Typography
        className={classes.intro}
        variant="h4"
        align="center"
        gutterBottom
      >
        <FormattedMessage id="home.intro" />
      </Typography>

      <Grid container justify="center" spacing={2}>
        <Grid item container justify="center" xs={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Scrivimi
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Scrica CV
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <CardBox avatar="/images/logos/MongoDB.png" title="MongoDB" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardBox avatar="/images/logos/ExpressJS.png" title="NodeJS" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardBox avatar="/images/logos/ReactJS.png" title="ReactJS" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardBox avatar="/images/logos/NodeJS.png" title="NodeJS" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
