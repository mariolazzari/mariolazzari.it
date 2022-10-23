import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getRijks } from "redux/slices/rijksSlice";
// MUI components
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import TextBox from "components/TextBox";
import { Back, Search } from "components/Buttons";
// MUI colors
import indigo from "@mui/material/colors/indigo";
// components
import Image from "./Image";

// component
const Rijks = () => {
  // state
  const [search, setSearch] = useState("Rembrandt");
  // redux
  const { images, loading } = useSelector(state => ({
    images: state.rijks.images,
    loading: state.rijks.loading,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    box: {
      minHeight: "95vh",
      backgroundColor: indigo[50],
      padding: 2,
    },
    search: {
      marginY: 10,
    },
  };

  // on search change event handler
  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  // on submit event handler
  const onSubmit = e => {
    e.preventDefault();
    dispatch(getRijks(search));
  };

  // search
  useEffect(() => {
    dispatch(getRijks());
  }, [dispatch]);

  return (
    <form onSubmit={onSubmit}>
      <Grid sx={styles.box} container justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <Backdrop open={loading} />
        </Grid>

        <Grid item xs={12}>
          <TextBox
            sx={styles.search}
            label="Cerca"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>

        <Grid item container justifyContent="center" xs={12}>
          <Back />
          <Search />
        </Grid>

        {images.map(i => (
          <Grid
            key={i.id}
            item
            container
            justifyContent="center"
            alignItems="stretch"
            xs={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Image selected={i} />
          </Grid>
        ))}
      </Grid>
    </form>
  );
};

export default Rijks;
