import { FormattedMessage } from "react-intl";
// MUI components
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// components
import Carousel from "../../components/Carousel";

// component styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url("/images/wallpapers/home.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  title: {
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "bold",
  },
  carousel: {},
}));

// component
const Home = () => {
  // styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Typography className={classes.title} variant="h1" color="secondary">
            <FormattedMessage id="home.title" />
          </Typography>
          <Typography
            className={classes.subTitle}
            variant="h3"
            color="secondary"
          >
            <FormattedMessage id="home.subtitle" />
          </Typography>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Carousel />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
