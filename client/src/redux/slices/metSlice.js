import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  loading: false,
  error: "",
  page: 1,
  perPage: 10,
  count: 0,
};

const metSlice = createSlice({
  name: "met",
  initialState,
  reducers: {
    getData: state => {
      state.images = [];
      state.loading = true;
      state.error = "";
      state.count = 0;
      state.page = 1;
    },
    setData: (state, action) => {
      const { images, count } = action.payload;
      state.images = images;
      state.count = count;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const selectData = state => ({
  images: state.met.images,
  error: state.met.error,
  loading: state.met.loading,
  count: state.met.count,
});

export const { getData, setData, setError } = metSlice.actions;

export default metSlice.reducer;
