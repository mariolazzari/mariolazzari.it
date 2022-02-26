import { useEffect, Suspense, lazy } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
import { getLastCertifiations } from "../../actions/certificationActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
// MUI icons
import MailIcon from "@material-ui/icons/Mail";
import DownloadIcon from "@material-ui/icons/CloudDownload";
// MUI colors
import { indigo } from "@material-ui/core/colors";
// component
const Certification = lazy(() => import("../Certifications/Certification"));
const CardBox = lazy(() => import("../../components/CardBox"));
const Socials = lazy(() => import("../../components/Socials"));
const GitHub = lazy(() => import("./GitHub"));

// component styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: indigo[50],
    padding: theme.spacing(1),
    width: "100vw",
  },
  title: {
    marginTop: theme.spacing(8),
    fontWeight: "bold",
  },
  subtitle: {
    margin: theme.spacing(1, 0),
    fontWeight: "bold",
  },
  intro: {
    margin: theme.spacing(1, "10%"),
  },
  button: {
    minWidth: theme.spacing(12),
    margin: theme.spacing(0, 1),
  },
  icon: {
    margin: theme.spacing(0, 1),
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
      transform: "scale(1.1)",
    },
  },
}));

// component
const Home = () => {
  // Redux
  const { certifications, locale, cards } = useSelector(state => ({
    certifications: state.certification.certificationsLast,
    locale: state.app.locale,
    cards: state.skill.main,
  }));
  const dispatch = useDispatch();

  // start cv download
  const onDownloadClick = e => {
    e.preventDefault();
    let cv = "/cv/cv_mario_lazzari_it.pdf";
    let title = "CV Mario Lazzari";

    if (locale === "en") {
      cv = "/cv/cv_mario_lazzari_en.pdf";
      title = "Mario Lazzari Resume";
    }

    window.open(cv, title);
  };

  // load last certifications
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getLastCertifiations());
    dispatch(setSelectedRoute("/"));
  }, [dispatch]);

  // locales
  const intl = useIntl();

  // styles
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {intl.formatMessage({ id: "home.title" }) +
            " " +
            intl.formatMessage({ id: "home.subtitle" })}
        </title>
        <link rel="canonical" href="https://www.mariolazzari.it/" />
        <meta
          name="description"
          content={intl.formatMessage({ id: "home.intro" })}
        />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongo web developer brescia milano full stack"
        />
      </Helmet>

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
      >
        <FormattedMessage id="home.subtitle" />
      </Typography>

      <Grid container justify="center" spacing={2}>
        <Grid item container justify="center" xs={12}>
          <img
            src="images/ucraina.png"
            alt="Ucraina"
            width={250}
            height={235}
          />
        </Grid>

        <Grid item container justify="center" xs={12}>
          <Tooltip title="Premi qui per contattarmi">
            <Button
              component={Link}
              to="/contacts"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <MailIcon className={classes.icon} color="secondary" />
              <FormattedMessage id="home.mailButton" />
            </Button>
          </Tooltip>

          <Tooltip title="Premi qui per scaricare il mio CV">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={onDownloadClick}
            >
              <DownloadIcon className={classes.icon} color="primary" />
              <FormattedMessage id="home.cvButton" />
            </Button>
          </Tooltip>
        </Grid>

        <Grid item container justify="center" xs={12}>
          <Typography
            className={classes.intro}
            variant="h4"
            align="center"
            gutterBottom
          >
            <FormattedMessage id="home.intro" />
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            className={classes.subtitle}
            variant="h3"
            color="primary"
            align="center"
          >
            <FormattedMessage id="home.toolsTitle" />
          </Typography>
        </Grid>
        <Grid item container justify="center" xs={12}>
          <Typography
            className={classes.link}
            component={Link}
            to="/skills"
            variant="h5"
            color="primary"
            align="center"
          >
            <FormattedMessage id="home.toolsSubtitle" />
          </Typography>
        </Grid>

        {cards.map((card, i) => (
          <Grid key={i} item xs={12} sm={6} lg={3}>
            <Suspense fallback={<CircularProgress />}>
              <CardBox
                avatar={card.avatar}
                title={card.title}
                text={card.text}
                height={400}
                onCardClick={card.onClick}
              />
            </Suspense>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography
            className={classes.subtitle}
            variant="h3"
            color="primary"
            align="center"
          >
            <FormattedMessage id="home.certTitle" />
          </Typography>
        </Grid>

        <Grid item container justify="center" xs={12}>
          <Typography
            className={classes.link}
            component={Link}
            to="/certifications"
            variant="h5"
            color="primary"
            align="center"
          >
            <FormattedMessage id="home.certSubtitle" />
          </Typography>
        </Grid>

        {certifications.map(c => (
          <Grid
            item
            container
            justify="center"
            key={c._id}
            xs={12}
            sm={6}
            lg={3}
          >
            <Suspense fallback={<CircularProgress />}>
              <Certification selected={c} />
            </Suspense>
          </Grid>
        ))}

        <Grid item container justify="center" xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <GitHub />
          </Suspense>
        </Grid>

        <Grid item xs={12}>
          <Typography
            className={classes.subtitle}
            variant="h3"
            color="primary"
            align="center"
            gutterBottom
          >
            I miei contatti
          </Typography>
        </Grid>

        <Grid item container justify="center" xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <Socials />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
