import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  pods: [],
  neos: [],
  loading: false,
  error: "",
};

const nasaSlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    getPods: state => {
      state.pods = [];
      state.error = "";
      state.loading = true;
    },
    setPods: (state, action) => {
      state.pods = action.payload;
      state.loading = false;
    },
    getNeos: state => {
      state.neos = [];
      state.error = "";
      state.loading = true;
    },
    setNeos: (state, action) => {
      state.neos = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// selectors
export const selectPods = state => ({
  pods: state.nasa.pods,
  loading: state.nasa.loading,
  error: state.nasa.error,
});

export const selectNeos = state => ({
  neos: state.nasa.neos,
  loading: state.nasa.loading,
  error: state.nasa.error,
});

// actions
export const { getPods, setPods, getNeos, setNeos, setError } =
  nasaSlice.actions;

export default nasaSlice.reducer;
