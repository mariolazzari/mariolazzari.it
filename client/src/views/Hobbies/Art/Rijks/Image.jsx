import PropTypes from "prop-types";
// MUI components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// component
const Image = ({ selected }) => {
  const styles = {
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
      cursor: "pointer",
      borderRadius: 2,
    },
    title: {
      fontWeight: "bold",
      marginY: 1,
    },
    text: {
      marginY: 1,
    },
  };

  // on paper click event handler
  const onPaperClick = () => {
    window.open(selected.url, "_blank");
  };

  return (
    <Paper sx={styles.paper} onClick={onPaperClick} elevation={12}>
      <Typography
        sx={styles.title}
        variant="h6"
        align="center"
        color="primary"
        gutterBottom
      >
        {selected.title}
      </Typography>

      <img src={selected.url} alt={selected.title} width="100%" />

      <Typography sx={styles.text} variant="body1" align="justify" paragraph>
        {selected.longTitle}
      </Typography>
    </Paper>
  );
};

// mandatory props
Image.propTypes = {
  selected: PropTypes.object.isRequired,
};

export default Image;
