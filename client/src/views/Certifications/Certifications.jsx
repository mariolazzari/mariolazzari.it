import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCertifications,
  selectCerts,
} from "redux/slices/certificationSlice";
// MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
// MUI icons
import SearchIcon from "@mui/icons-material/Search";
// components
import Meta from "components/Meta";
import TextBox from "components/TextBox";
import Certification from "./Certification";
import indigo from "@mui/material/colors/indigo";

// component
const Certifications = () => {
  // state
  const [search, setSearch] = useState("");
  // Redux
  const { certifications, loading } = useSelector(selectCerts);
  const dispatch = useDispatch();

  // styles
  const styles = {
    box: {
      backgroundColor: indigo[50],
      padding: 10,
      minHeight: "95vh",
    },
    grid: {
      width: "100%",
    },
    search: {
      marginY: 10,
    },
  };

  // locales
  const intl = useIntl();

  // on search change event handler
  const onSearchChange = e => {
    setSearch(e.target.value);
  };
  // on search clear event handler
  const onSearchClear = () => {
    setSearch("");
  };

  // init page
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCertifications());
  }, [dispatch]);

  // filter certs
  const searchFilter = cert => {
    const title = cert.title.toLowerCase();
    const text = search.toLowerCase();

    if (title.includes(text)) {
      return cert;
    }
  };

  return (
    <>
      <Meta title="certs.title" canonical="/certifications" />

      <Box sx={styles.box}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid sx={styles.search} item xs={12}>
            <TextBox
              name="search"
              label={intl.formatMessage({ id: "certs.search" })}
              value={search}
              onChange={onSearchChange}
              onClear={onSearchClear}
              startIcon={<SearchIcon color="primary" />}
              required={false}
            />
          </Grid>

          {certifications.filter(searchFilter).map(c => (
            <Grid
              key={c._id}
              item
              container
              justifyContent="center"
              xs={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Certification selected={c} />
            </Grid>
          ))}
        </Grid>

        <Backdrop open={loading} />
      </Box>
    </>
  );
};

export default Certifications;
