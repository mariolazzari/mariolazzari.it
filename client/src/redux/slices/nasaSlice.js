import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  pods: [],
  podsLoading: false,
  error: "",
};

const nasaSlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    getPods: state => {
      state.pods = [];
      state.podsLoading = true;
      state.error = "";
    },
    getPodsError: (state, action) => {
      state.error = action.payload;
      state.podsLoading = true;
    },
    getPodsSuccess: (state, action) => {
      state.pods = action.payload;
      state.podsLoading = false;
    },
  },
});

export const { getPods, getPodsError, getPodsSuccess } = nasaSlice.actions;

export default nasaSlice.reducer;
