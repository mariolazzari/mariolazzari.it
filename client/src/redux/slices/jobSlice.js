import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  jobs: [],
  loading: false,
  error: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getJobs: state => {
      state.loading = true;
      state.jobs = [];
      state.error = "";
    },
    setJobs: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectJobs = state => ({
  jobs: state.job.jobs,
  locale: state.app.locale,
});

export const { getJobs, setJobs, setError } = jobSlice.actions;

export default jobSlice.reducer;
