import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
import { getJobs } from "../../actions/jobActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
// utilities
import { formatDistanceToNow } from "date-fns";

//styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "94vh",
    backgroundColor: indigo[50],
    padding: theme.spacing(10, 1),
  },
  avatar: { backgroundColor: "white" },
  paper: {
    padding: theme.spacing(1, 2),
  },
  link: {
    "&:hover": {
      mouse: "pointer",
      fontWeight: "bold",
    },
  },
}));

// component
const Works = () => {
  // Redux
  const { jobs, locale, dates } = useSelector(state => ({
    jobs: state.job.jobs,
    locale: state.app.locale,
    dates: state.app.dates,
  }));
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();

  const options = {
    locale: dates.get(locale),
    includeSeconds: false,
    addSuffix: true,
  };

  // redenr date
  const renderDate = jobDate => {
    const date = new Date(jobDate);
    return formatDistanceToNow(date, options);
  };

  // render description
  const renderDescription = desc => {
    return desc.find(d => d.locale === locale).text;
  };

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

  const intl = useIntl();

  // get all jobs
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSelectedRoute("/jobs"));
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: "jobs.title" })}</title>
        <link rel="canonical" href="https://mariolazzari.it/jobs" />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      <Timeline align="alternate">
        {jobs.map(job => (
          <TimelineItem
            key={job._id}
            onClick={() => window.open(job.url, "_blank")}
          >
            <TimelineOppositeContent>
              <Typography>{renderDate(job.date)}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <Avatar
                  className={classes.avatar}
                  src={`/images/logos/${job.imagePath}`}
                  alt={job.company}
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} className={classes.paper}>
                <Typography className={classes.link} variant="h6">
                  {job.company}
                </Typography>
                <Typography>{renderDescription(job.description)}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Button
        className={classes.download}
        variant="contained"
        color="primary"
        onClick={onDownloadClick}
      >
        Download
      </Button>
    </Box>
  );
};

// component
export default Works;
