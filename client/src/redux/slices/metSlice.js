import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iamges: [],
  loading: false,
  error: "",
  page: 1,
  perPage: 10,
};

const metSlice = createSlice({
  name: "met",
  initialState,
  reducers: {
    getImages: (state, action) => {
      state.images = [];
      state.loading = true;
      state.error = "";
    },
    setImages: (state, action) => {
      state.images = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getImages, setImages, setError } = metSlice.actions;

export default metSlice.reducer;
