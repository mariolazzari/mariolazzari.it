import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  images: [],
  loading: false,
  error: "",
};

const rijksSlice = createSlice({
  name: "rijks",
  initialState,
  reducers: {
    getRijks: state => {
      state.images = [];
      state.loading = true;
      state.error = "";
    },
    setRijks: (state, action) => {
      state.images = action.payload;
      state.loading = false;
    },
    getError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getRijks, setError, setRijks } = rijksSlice.actions;

export default rijksSlice.reducer;
