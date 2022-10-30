import { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "redux/slices/metSlice";
// MUI components
import Box from "@mui/material/Box";
// components
import BackDrop from "components/BackDrop";
import { CardMediaBox } from "components/CardBox";

const Met = () => {
  // redux
  const { images, loading } = useSelector(state => ({
    images: state.met.images,
    loading: state.met.loading,
  }));
  const dispatch = useDispatch();

  const styles = {
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      jusyifyContent: "center",
      alignItem: "center",
      minHeight: "95vh",
      overflow: "auto",
      paddingY: 8,
    },
  };

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <Box sx={styles.root}>
      <BackDrop open={loading} />

      {images?.map(i => (
        <CardMediaBox
          key={i.id}
          title={i.title}
          image={i.primaryImageSmall}
          imageHeight={300}
          width={380}
        />
      ))}
    </Box>
  );
};

export default Met;
