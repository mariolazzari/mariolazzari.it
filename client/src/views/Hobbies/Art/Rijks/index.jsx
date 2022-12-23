import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getData } from "redux/slices/rijksSlice";
// MUI components
import Box from "@mui/material/Box";
// MUI colors
import indigo from "@mui/material/colors/indigo";
// compoennts
import { CardMediaBox } from "components/CardBox";
import BackDrop from "components/BackDrop";
import SearchBox from "components/SearchBox";

// component
const Rijks = () => {
  // state
  const [search, setSearch] = useState("Rembrandt");
  const [page, setPage] = useState(0);

  // redux
  const { data, loading } = useSelector(state => ({
    data: state.rijks.data,
    loading: state.rijks.loading,
  }));
  const dispatch = useDispatch();

  // styles
  const styles = {
    root: {
      minHeight: "95vh",
      backgroundColor: indigo[50],
      padding: 2,
    },
    results: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: "65vh",
      overflow: "auto",
    },
  };

  // on search change event handler
  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const onSearchClear = () => {
    setSearch("");
  };

  const onPageChange = page => {
    setPage(page);
    dispatch(getData({ search, page }));
  };

  // on submit event handler
  const onSubmit = () => {
    setPage(1);
    dispatch(getData({ search, page: 1 }));
  };

  const onCardClick = to => {
    window.open(to, "_blank");
  };

  // search
  useEffect(() => {
    dispatch(getData({ search: "Rembrandt", page: 1 }));
  }, [dispatch]);

  return (
    <Box sx={styles.root}>
      <BackDrop open={loading} />

      <SearchBox
        value={search}
        onSubmit={onSubmit}
        onChange={onSearchChange}
        onClear={onSearchClear}
        onPageChange={onPageChange}
        count={Math.round(data.count / 10)}
        page={page}
        image="rijks.png"
      />

      <Box sx={styles.results}>
        {data.images.map(i => (
          <CardMediaBox
            key={i.id}
            title={i.title}
            text={i.longTitle}
            image={i.preview}
            onClick={() => onCardClick(i.url)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Rijks;
