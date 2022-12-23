import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "redux/slices/metSlice";
// MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// components
import BackDrop from "components/BackDrop";
import SearchBox from "components/SearchBox";
import { CardMediaBox } from "components/CardBox";

const Met = () => {
  // state
  const [search, setSearch] = useState("Rembrandt");
  const [page, setPage] = useState(0);

  // redux
  const { images, loading } = useSelector(state => ({
    images: state.met.images,
    loading: state.met.loading,
  }));
  const dispatch = useDispatch();

  const styles = {
    root: {
      minHeight: "95vh",
      paddingY: 8,
    },
    logo: {
      marginY: 2,
    },
    search: {
      marginX: 5,
      marginY: 3,
    },
  };

  const onSearchChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const onSearchClear = () => {
    setSearch("");
  };

  const onPageChange = page => {
    setPage(page);
    dispatch(getImages({ search, page }));
  };

  // on submit event handler
  const onSubmit = () => {
    setPage(1);
    dispatch(getImages({ search, page: 1 }));
  };

  const onCardClick = url => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <Box sx={styles.root}>
      <BackDrop open={loading} />

      <Grid container justifyContent="center" spacing={2}>
        <Grid sx={styles.search} item xs={12}>
          <SearchBox
            value={search}
            onSubmit={onSubmit}
            onChange={onSearchChange}
            onClear={onSearchClear}
            onPageChange={onPageChange}
            count={Math.round(images.count / 10)}
            page={page}
            image="met.png"
          />
        </Grid>

        {images?.map(i => (
          <Grid key={i.id} item xs={12} md={6} lg={4}>
            <CardMediaBox
              title={i.title}
              image={i.primaryImageSmall}
              imageHeight={300}
              text={i.medium}
              width={400}
              onClick={() => onCardClick(i.primaryImage)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Met;
