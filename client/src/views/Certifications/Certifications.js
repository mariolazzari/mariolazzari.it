import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";
import { getCertifiations } from "../../actions/certificationActions";
// MUI components
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
// MUI icons
import SearchIcon from "@material-ui/icons/Search";
// MUI colors
import indigo from "@material-ui/core/colors/indigo";
// components
import TextBox from "../../components/TextBox";
import Certification from "./Certification";

// styles
const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: indigo[50],
    padding: theme.spacing(10, 5),
    minHeight: "95vh",
  },
  grid: {
    width: "100%",
  },
}));

// component
const Certifications = () => {
  // state
  const [search, setSearch] = useState("");
  // Redux
  const { certifications, loading } = useSelector(state => ({
    certifications: state.certification.certifications,
    loading: state.certification.certificationsLoading,
  }));
  const dispatch = useDispatch();
  // styles
  const classes = useStyles();

  // on search change event handler
  const onSearchChange = e => setSearch(e.target.value);
  // on search clear event handler
  const onSearchClear = () => setSearch("");

  // init page
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSelectedRoute("/certifications"));
    dispatch(getCertifiations());
  }, [dispatch]);

  return (
    <Box className={classes.box}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <TextBox
            value={search}
            onChange={onSearchChange}
            onClear={onSearchClear}
            startIcon={<SearchIcon color="primary" />}
          />
        </Grid>

        {certifications
          .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
          .map(c => (
            <Grid item container justify="center" xs={12} md={6} lg={4} xl={3}>
              <Certification key={c._id} selected={c} />
            </Grid>
          ))}
      </Grid>

      <Backdrop open={loading} />
    </Box>
  );
};

export default Certifications;
