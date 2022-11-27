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
    setPods: (state, action) => {
      state.pods = action.payload;
      state.podsLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.podsLoading = true;
    },
  },
});

// selectors
export const selectPods = state => ({
  pods: state.nasa.pods,
  loading: state.nasa.podsLoading,
});

// actions
export const { getPods, setPods, setError } = nasaSlice.actions;

export default nasaSlice.reducer;
