import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getNasaPods } from "../../actions/nasaActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextBox from "../../components/TextBox";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
//MUI icons
import SearchIcon from "@mui/icons-material/Search";
// components
import { Back, Options, Search } from "../../components/Buttons";
import NasaPod from "./NasaPod";
import { indigo } from "@mui/material/colors";

// components
const Nasa = () => {
  // state
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  // redux
  const { today, pods, loading } = useSelector(state => ({
    today: state.nasa.podToday,
    pods: state.nasa.pods,
    lodaing: state.nasa.podsLoading,
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
    search: {
      maxWidth: 100,
      margin: 2,
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

  // on search change event handler
  const onSearchChange = e => setSearch(e.target.value);
  // on clear search event handler
  const onClearSearch = () => setSearch("");

  // on form submit
  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(getNasaPods(10));
  };

  // on options click event handler
  const onOptionsClick = () => setShowOptions(!showOptions);

  // render results label
  const renderLabel = () => {
    const label =
      pods?.length === 0
        ? intl.formatMessage({ id: "nasa.today" })
        : intl.formatMessage({ id: "nasa.records" }) + " " + pods?.length;

    return label;
  };

  // load today pic
  useEffect(() => {
    dispatch(getNasaPods(""));
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
        <TextBox
          sx={styles.search}
          value={search}
          onChange={onSearchChange}
          onClear={onClearSearch}
          startIcon={<SearchIcon />}
          required={false}
          placeholder={intl.formatMessage({ id: "nasa.placeholder" })}
        />
        <Box sx={styles.buttons}>
          <Back sx={styles.back} variant="outlined" />
          <Options onClick={onOptionsClick} />
          <Search />
        </Box>

        <Typography variant="body1">{renderLabel()}</Typography>

        <Box sx={styles.results}>
          {pods?.length > 0 ? (
            pods?.map(pod => <NasaPod selected={pod} />)
          ) : today ? (
            <NasaPod selected={today} />
          ) : null}
        </Box>
      </form>
    </Box>
  );
};

export default Nasa;
