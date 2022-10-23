import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import yellow from "@mui/material/colors/yellow";

// component
const Footer = () => {
  // styles
  const styles = {
    footer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
      backgroundColor: "primary.main",
    },
    text: {
      fontWeight: "bold",
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        color: yellow[200],
        transform: "scale(1.1)",
      },
    },
  };

  return (
    <Box sx={styles.footer}>
      <Typography sx={styles.text} variant="body1" color="secondary">
        Mario Lazzari &copy; {new Date().getFullYear()}
      </Typography>
      <Typography
        sx={styles.link}
        variant="body2"
        color="secondary"
        component="a"
        target="_blank"
        href="mailto:mario.lazzari@gmail.com"
      >
        mario.lazzari@gmail.com
      </Typography>
    </Box>
  );
};

export default Footer;
