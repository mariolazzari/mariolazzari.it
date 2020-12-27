import React from "react";
import PropTypes from "prop-types";
// MUI components
import { makeStyles } from "@material-ui/core";

// compoennt styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: theme.spacing(50),
  },
}));

const Certification = props => {
  const classes = useStyles();

  return (
    <div>
      <img
        className={classes.image}
        src="/uploads/certifications/material-ui.jpg"
        alt="test"
      />
    </div>
  );
};

Certification.propTypes = {};

export default Certification;
