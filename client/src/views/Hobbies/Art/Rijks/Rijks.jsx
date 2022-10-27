import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getData } from "redux/slices/rijksSlice";
// MUI components
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextBox from "components/TextBox";
import PageBox from "components/PageBox";
import { Back, Search } from "components/Buttons";
import { CardMediaBox } from "components/CardBox";
// MUI colors
import indigo from "@mui/material/colors/indigo";

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
      minHeight: "94vh",
      backgroundColor: indigo[50],
      padding: 2,
    },
    search: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginY: 8,
      padding: 2,
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
    },
    results: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "cemter",
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
  const onSubmit = e => {
    e.preventDefault();
    setPage(1);
    dispatch(getData({ search }));
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
      <Backdrop open={loading} />

      <form onSubmit={onSubmit}>
        <Paper sx={styles.search} elevation={10}>
          <TextBox
            name="search"
            label="Cerca"
            value={search}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
          <Box sx={styles.buttons}>
            <Back variant="outlined" />
            <Search disabled={search === ""} />
          </Box>

          <PageBox
            count={data.count / 10}
            page={page}
            onChange={onPageChange}
          />
        </Paper>
      </form>

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
