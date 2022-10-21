import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSocials } from "../../actions/socialActions";
// MUI components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

// component
const Socials = () => {
  // Redux
  const { socials } = useSelector(state => ({
    socials: state.social.socials,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 2,
    },
    avatar: {
      margin: 1,
      height: 48,
      width: 48,
      "&:hover": {
        transform: "scale(1.5)",
      },
    },
  };

  // load social accounts
  useEffect(() => {
    dispatch(getSocials());
  }, [dispatch]);

  return (
    <Box sx={styles.box}>
      {socials.map(social => (
        <Avatar
          sx={styles.avatar}
          key={social.url}
          src={`/images/logos/${social.name}.png`}
          alt={social.name}
          onClick={() => window.open(social.url, "_blank")}
        />
      ))}
    </Box>
  );
};

export default Socials;
