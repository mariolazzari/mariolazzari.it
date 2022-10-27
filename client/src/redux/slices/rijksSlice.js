import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  data: {
    count: 0,
    images: [],
  },
  loading: false,
  error: "",
};

const rijksSlice = createSlice({
  name: "rijks",
  initialState,
  reducers: {
    getData: state => {
      state.data = {
        count: 0,
        images: [],
      };
      state.loading = true;
      state.error = "";
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getData, setError, setData } = rijksSlice.actions;

export default rijksSlice.reducer;
