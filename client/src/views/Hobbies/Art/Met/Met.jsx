import { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "redux/slices/metSlice";
// MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
      minHeight: "95vh",
      paddingY: 8,
    },
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

      <Grid container>
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
