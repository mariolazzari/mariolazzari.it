import { useIntl } from "react-intl";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPods } from "redux/slices/nasaSlice";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
// components
import { Back, Search } from "components/Buttons";
import NasaPod from "./Pod";
import { indigo } from "@mui/material/colors";

// components
const Nasa = () => {
  // redux
  const { pods, loading } = useSelector(state => ({
    pods: state.nasa.pods,
    loading: state.nasa.podsLoading,
  }));
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: "nasa.title" })}</title>
        <link rel="canonical" href="https://www.mariolazzari.it/nasa/" />

        <meta
          name="keywords"
          content="nasa programmazione javascript react redux nodejs mongo web developer brescia milano full stack"
        />
      </Helmet>

      <form onSubmit={onFormSubmit}>
        <Backdrop open={loading} />

        <Avatar sx={styles.avatar} src="/images/logos/nasa.png" />
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
