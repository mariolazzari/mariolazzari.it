import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "redux/slices/appSlice";
import { getJobs } from "redux/slices/jobSlice";
// MUI components
import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// utilities
import { formatDistanceToNow } from "date-fns";
import { indigo } from "@mui/material/colors";

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
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "95vh",
      backgroundColor: indigo[50],
      padding: 10,
    },
    avatar: {
      backgroundColor: "white",
    },
    paper: {
      padding: 2,
    },
    link: {
      "&:hover": {
        mouse: "pointer",
        fontWeight: "bold",
      },
    },
  };

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
    <Box sx={styles.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: "jobs.title" })}</title>
        <link rel="canonical" href="https://mariolazzari.it/jobs" />
        <meta
          name="keywords"
          content="programmazione javascript react redux nodejs mongodb web developer brescia milano competenze skill"
        />
      </Helmet>

      <Timeline position="alternate">
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
                  sx={styles.avatar}
                  src={`/images/logos/${job.imagePath}`}
                  alt={job.company}
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} sx={styles.paper}>
                <Typography sx={styles.link} variant="h6">
                  {job.company}
                </Typography>
                <Typography>{renderDescription(job.description)}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Button
        sx={styles.download}
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
