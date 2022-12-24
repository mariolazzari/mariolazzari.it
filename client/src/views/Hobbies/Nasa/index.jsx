import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPods, getNeos, selectPods } from "redux/slices/nasaSlice";
// Mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import indigo from "@mui/material/colors/indigo";
// Mui icons
import BackIcon from "@mui/icons-material/ArrowBack";
import PodIcon from "@mui/icons-material/CameraAlt";
import NeoIcon from "@mui/icons-material/NearMe";
// components
import Meta from "components/Meta";
import BackDrop from "components/BackDrop";
import SearchBox from "./SearchBox";
import { Speed } from "components/Buttons";
import Pods from "./Pods";
import Neos from "./Neos";

// components
const Nasa = () => {
  // state
  const [section, setSection] = useState("pods");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  // redux
  const { loading, error } = useSelector(selectPods);
  const dispatch = useDispatch();

  // styles
  const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: indigo[50],
      minHeight: "95vh",
      padding: 2,
      paddingTop: 10,
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      margin: 1,
    },
  };

  // navigarion
  const navigate = useNavigate();

  // locales
  const intl = useIntl();

  const speedActions = [
    {
      name: "Back",
      icon: <BackIcon />,
      onClick: () => navigate(-1),
    },
    {
      name: "Picture of the day",
      icon: <PodIcon />,
      onClick: () => setSection("pods"),
    },
    {
      name: "Near Earth objects",
      icon: <NeoIcon />,
      onClick: () => setSection("neos"),
    },
  ];

  // on form submit
  const onSubmit = () => {
    switch (section) {
      case "pods":
        dispatch(getPods({ from, to }));
        break;

      case "neos":
        dispatch(getNeos({ from, to }));
        break;

      default:
        break;
    }
  };

  // redenr section
  const renderSection = () => {
    const sections = {
      pods: <Pods />,
      neos: <Neos />,
    };
    return sections[section];
  };

  // load today pic
  useEffect(() => {
    dispatch(getPods());
  }, [dispatch]);

  return (
    <>
      <Meta
        title={intl.formatMessage({ id: "nasa.title" })}
        canonical="https://www.mariolazzari.it/nasa"
      />

      <Box sx={styles.box}>
        <Typography color="error">{error}</Typography>
        <BackDrop open={loading} />
        <SearchBox
          title={section}
          from={from}
          to={to}
          onSearch={onSubmit}
          onFromChange={setFrom}
          onToChange={setTo}
        />

        {renderSection()}
        <Speed items={speedActions} />
      </Box>
    </>
  );
};

export default Nasa;
