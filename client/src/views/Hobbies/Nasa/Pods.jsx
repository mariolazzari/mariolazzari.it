import React from "react";
// Redux
import { useSelector } from "react-redux";
import { selectPods } from "redux/slices/nasaSlice";
// Mui
import Box from "@mui/material/Box";
// components
import Pod from "./Pod";

const Pods = () => {
  // redux
  const { pods } = useSelector(selectPods);

  // styles
  const styles = {
    results: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      minHeight: "50vh",
    },
  };

  return (
    <Box sx={styles.results}>
      {pods?.map(pod => (
        <Pod key={pod.url} selected={pod} />
      ))}
    </Box>
  );
};

export default Pods;
