import { useIntl } from "react-intl";
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPods, selectPods } from "redux/slices/nasaSlice";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import indigo from "@mui/material/colors/indigo";
// components
import Meta from "components/Meta";
import BackDrop from "components/BackDrop";
import TextBox from "components/TextBox";
import { Back, Search } from "components/Buttons";
import NasaPod from "./Pod";

// components
const Nasa = () => {
  // redux
  const { pods, loading } = useSelector(selectPods);
  const dispatch = useDispatch();

  // styles
  const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: indigo[50],
      minHeight: "95vh",
      paddingX: 2,
      paddingTop: 8,
    },
    avatar: {
      height: 100,
      width: 100,
      marginX: "auto",
      marginBottom: 5,
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      margin: 1,
    },
    results: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      minHeight: "50vh",
    },
  };

  // locales
  const intl = useIntl();

  // on form submit
  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(getPods(10));
  };

  // load today pic
  useEffect(() => {
    dispatch(getPods());
  }, [dispatch]);

  return (
    <Box sx={styles.box}>
      <Meta
        title={intl.formatMessage({ id: "nasa.title" })}
        canonical="https://www.mariolazzari.it/nasa/"
      />

      <form onSubmit={onFormSubmit}>
        <BackDrop open={loading} />

        <Avatar sx={styles.avatar} src="/images/logos/nasa.png" />

        <TextBox required={false} />

        <Box sx={styles.buttons}>
          <Back sx={styles.back} variant="outlined" />
          <Search />
        </Box>

        <Box sx={styles.results}>
          {pods?.map(pod => (
            <NasaPod key={pod.url} selected={pod} />
          ))}
        </Box>
      </form>
    </Box>
  );
};

export default Nasa;
