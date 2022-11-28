// MUI components
import Box from "@mui/material/Box";
// component
import Meta from "components/Meta";
import Hobby from "./Hobby";
import indigo from "@mui/material/colors/indigo";

// component
const Hobbies = () => {
  // styles
  const styles = {
    box: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: indigo[50],
      minHeight: "95vh",
      padding: 5,
      borderRadius: 1,
    },
  };

  const hobbies = [
    {
      title: "hobbies.nasaTitle",
      description: "hobbies.nasaDesc",
      imagePath: "nasa.png",
      to: "/nasa",
    },
    {
      title: "hobbies.rijksTitle",
      description: "hobbies.rijksDesc",
      imagePath: "rijks.png",
      to: "/rijks",
    },
    {
      title: "hobbies.metTitle",
      description: "hobbies.metDesc",
      imagePath: "met.png",
      to: "/met",
    },
  ];

  return (
    <Box sx={styles.box}>
      <Meta title="hobbies.title" canonical="/hobbies" />

      {hobbies.map(hobby => (
        <Hobby key={hobby.to} selected={hobby} />
      ))}
    </Box>
  );
};

export default Hobbies;
