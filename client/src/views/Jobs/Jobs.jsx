import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "redux/slices/appSlice";
import { getJobs } from "redux/slices/jobSlice";
// MUI components
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Timeline from "@mui/lab/Timeline";
import Button from "@mui/material/Button";
// MUI icons
import DownloadIcon from "@mui/icons-material/Download";
// MUI colors
import { indigo } from "@mui/material/colors";
// components
import Job from "./Job";

// component
const Works = () => {
  // Redux
  const { jobs, locale } = useSelector(state => ({
    jobs: state.job.jobs,
    locale: state.app.locale,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "95vh",
      backgroundColor: indigo[50],
      marginTop: 8,
      paddingY: 1,
    },
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
          <Job key={job._id} job={job} locale={locale} />
        ))}
      </Timeline>

      <Tooltip title="Premi qui per scaricare il mio CV">
        <Button variant="contained" color="primary" onClick={onDownloadClick}>
          <DownloadIcon sx={styles.icon} color="secondary" />
          {intl.formatMessage({ id: "home.cvButton" })}
        </Button>
      </Tooltip>
    </Box>
  );
};

// component
export default Works;
