import React from "react";
import PropTypes from "prop-types";

// component
const Hobby = props => {
  return <div>{props.title}</div>;
};

// mandatory props
Hobby.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Hobby;
