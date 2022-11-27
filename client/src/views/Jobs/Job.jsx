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
import { renderDate } from "utils/dates";

const Job = ({ job, locale }) => {
  // state
  const [focus, setFocus] = useState(false);

  // styles
  const styles = {
    item: {
      cursor: "pointer",
    },
    avatar: {
      backgroundColor: "white",
      height: 64,
      width: 64,
    },
    paper: {
      padding: 1,
      border: focus ? `2px solid ${indigo[900]}` : `1px solid ${indigo[300]}`,
    },
    connect: {
      height: 50,
      backgroundColor: indigo[900],
    },
  };

  // render description
  const renderDescription = desc => {
    return desc.find(d => d.locale === locale).text;
  };

  const onItemClick = to => {
    window.open(to, "_blank");
  };

  return (
    <TimelineItem
      sx={styles.item}
      key={job._id}
      onClick={() => onItemClick(job.url)}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <TimelineOppositeContent align="center">
        <Typography variant={focus ? "h6" : "body1"} color="primary">
          {renderDate(job.date, locale)}
        </Typography>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot color="primary" variant={focus ? "filled" : "outlined"}>
          <Avatar
            sx={styles.avatar}
            src={`/images/logos/${job.imagePath}`}
            alt={job.company}
          />
        </TimelineDot>
        <TimelineConnector sx={styles.connect} />
      </TimelineSeparator>

      <TimelineContent>
        <Paper sx={styles.paper} elevation={focus ? 20 : 1}>
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
