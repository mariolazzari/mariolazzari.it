import { useEffect, Suspense, lazy } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCertifications } from "redux/slices/certificationSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
// MUI icons
import MailIcon from "@mui/icons-material/Mail";
import DownloadIcon from "@mui/icons-material/CloudDownload";
// MUI colors
import { indigo } from "@mui/material/colors";
// component
import Meta from "components/Meta";
import CardBox from "components/CardBox";

const Certification = lazy(() => import("views/Certifications/Certification"));
const Socials = lazy(() => import("components/Socials"));
const GitHub = lazy(() => import("./GitHub"));

// component styles
const styles = {
  root: {
    backgroundColor: indigo[50],
    padding: 1,
    width: "100vw",
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
  },
  subtitle: {
    marginX: 1,
    fontWeight: "bold",
  },
  intro: {
    marginY: 1,
  },
  button: {
    width: 110,
    margin: 1,
  },
  icon: {
    margin: 1,
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
      transform: "scale(1.05)",
    },
  },
};

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

  // on card click
  const onCardClick = url => window.open(url, "_blank");

  // load last certifications
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCertifications());
  }, [dispatch]);

  return (
    <>
      <Meta title="home.title" canonical="" />

      <Box sx={styles.root}>
        <Typography
          sx={styles.title}
          variant="h1"
          color="primary"
          align="center"
        >
          <FormattedMessage id="home.title" />
        </Typography>

        <Typography
          sx={styles.subtitle}
          variant="h2"
          color="primary"
          align="center"
          gutterBottom
        >
          <FormattedMessage id="home.subtitle" />
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item container justifyContent="center" xs={12}>
            <Typography
              sx={styles.intro}
              component="h2"
              variant="h4"
              align="center"
              gutterBottom
            >
              <FormattedMessage id="home.intro" />
            </Typography>
          </Grid>

          <Grid item container justifyContent="center" xs={12}>
            <Tooltip title="Premi qui per contattarmi">
              <Button
                sx={styles.button}
                component={Link}
                to="/contacts"
                variant="outlined"
                color="primary"
              >
                <MailIcon sx={styles.icon} />
                <FormattedMessage id="home.mailButton" />
              </Button>
            </Tooltip>

            <Tooltip title="Premi qui per scaricare il mio CV">
              <Button
                sx={styles.button}
                variant="contained"
                color="primary"
                onClick={onDownloadClick}
              >
                <DownloadIcon sx={styles.icon} color="secondary" />
                <FormattedMessage id="home.cvButton" />
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={styles.subtitle}
              variant="h3"
              color="primary"
              align="center"
            >
              <FormattedMessage id="home.toolsTitle" />
            </Typography>
          </Grid>

          <Grid item container justifyContent="center" xs={12}>
            <Typography
              sx={styles.link}
              component={Link}
              to="/skills"
              variant="h5"
              color="primary"
              align="center"
            >
              <FormattedMessage id="home.toolsSubtitle" />
            </Typography>
          </Grid>

          {cards.map(card => (
            <Grid key={card.title} item xs={12} sm={6} lg={3}>
              <CardBox
                avatar={card.avatar}
                title={card.title}
                text={card.text}
                height={400}
                onCardClick={() => onCardClick(card.url)}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography
              sx={styles.subtitle}
              variant="h3"
              color="primary"
              align="center"
            >
              <FormattedMessage id="home.certTitle" />
            </Typography>
          </Grid>

          <Grid item container justifyContent="center" xs={12}>
            <Typography
              sx={styles.link}
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
              justifyContent="center"
              key={c._id}
              xs={12}
              sm={6}
              lg={4}
            >
              <Suspense fallback={<CircularProgress />}>
                <Certification selected={c} />
              </Suspense>
            </Grid>
          ))}

          <Grid item container justifyContent="center" xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <GitHub />
            </Suspense>
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={styles.subtitle}
              variant="h3"
              color="primary"
              align="center"
              gutterBottom
            >
              I miei contatti
            </Typography>
          </Grid>

          <Grid item container justifyContent="center" xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <Socials />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
