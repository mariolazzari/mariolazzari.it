import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
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
    width: theme.spacing(10),
    margin: theme.spacing(1),
  },
}));

// component
const Home = () => {
  // cards to render
  const cards = [
    {
      avatar: "/images/logos/mongodb.png",
      title: "home.mongoTitle",
      text: "home.mongoText",
    },
    {
      avatar: "/images/logos/express.png",
      title: "home.expressTitle",
      text: "home.expressText",
    },
    {
      avatar: "/images/logos/reactjs.png",
      title: "home.reactTitle",
      text: "home.reactText",
    },
    {
      avatar: "/images/logos/nodejs.png",
      title: "home.nodeTitle",
      text: "home.nodeText",
    },
  ];

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
          <Tooltip title="Premi qui per contattarmi">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="home.mailButton" />
            </Button>
          </Tooltip>

          <Tooltip title="Premi qui per scaricare il mio CV">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              <FormattedMessage id="home.cvButton" />
            </Button>
          </Tooltip>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            Strumenti principali
          </Typography>
        </Grid>

        {cards.map(card => (
          <Grid item xs={12} sm={6} lg={3}>
            <CardBox
              avatar={card.avatar}
              title={card.title}
              text={card.text}
              height={400}
            />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" color="primary" align="center">
          Visualizza tutti i miei strumenti nella sezione competenze.
        </Typography>
      </Grid>
    </Box>
  );
};

export default Home;
