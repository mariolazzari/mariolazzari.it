import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  pods: [],
  podsLoading: false,
};

const nasaSlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    getPods: state => {
      state.podsLoading = true;
    },
  },
});

export const { getPods } = nasaSlice.actions;

export default nasaSlice.reducer;
