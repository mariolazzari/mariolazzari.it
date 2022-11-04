import { useState } from "react";
// MUI components
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// MUI colors
import { indigo } from "@mui/material/colors";
// utils
import { formatDistanceToNow } from "date-fns";

const Job = ({ job, dates, locale }) => {
  // state
  const [elevation, setElevation] = useState(1);

  // styles
  const styles = {
    avatar: {
      backgroundColor: "white",
      height: 64,
      width: 64,
    },
    paper: {
      padding: 1,
      cursor: "pointer",
      border: `1px solid ${indigo[300]}`,
    },
    link: {
      "&:hover": {
        cursor: "pointer",
        fontWeight: "bold",
      },
    },
  };

  const options = {
    locale: dates.get(locale),
    includeSeconds: false,
    addSuffix: true,
  };

  // render date
  const renderDate = jobDate => {
    const date = new Date(jobDate);
    return formatDistanceToNow(date, options);
  };

  // render description
  const renderDescription = desc => {
    return desc.find(d => d.locale === locale).text;
  };

  const onItemClick = to => {
    window.open(to, "_blank");
  };

  return (
    <TimelineItem key={job._id} onClick={() => onItemClick(job.url)}>
      <TimelineOppositeContent>
        <Typography variant="body1">{renderDate(job.date)}</Typography>
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
        <Paper
          sx={styles.paper}
          elevation={elevation}
          onMouseEnter={() => setElevation(20)}
          onMouseLeave={() => setElevation(1)}
        >
          <Typography sx={styles.link} variant="body1">
            {job.company}
          </Typography>
          <Typography variant="body2">
            {renderDescription(job.description)}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default Job;
