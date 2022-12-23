import { useEffect } from "react";
import { useIntl } from "react-intl";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getJobs, selectJobs } from "redux/slices/jobSlice";
// MUI components
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Timeline from "@mui/lab/Timeline";
import Button from "@mui/material/Button";
// MUI icons
import DownloadIcon from "@mui/icons-material/Download";
// MUI colors
import indigo from "@mui/material/colors/indigo";
// components
import Meta from "components/Meta";
import Job from "./Job";

// component
const Jobs = () => {
  // Redux
  const { jobs, locale } = useSelector(selectJobs);
  const dispatch = useDispatch();

  // styles
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "88vh",
      backgroundColor: indigo[50],
      marginTop: 8,
      paddingY: 1,
    },
    timeline: {
      height: "70vh",
      overflow: "auto",
      marginY: 5,
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
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Box Box sx={styles.root}>
      <Meta title="jobs.title" canonical="/jobs" />

      <Box sx={styles.timeline}>
        <Timeline position="alternate">
          {jobs.map(job => (
            <Job key={job._id} job={job} locale={locale} />
          ))}
        </Timeline>
      </Box>

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
export default Jobs;
