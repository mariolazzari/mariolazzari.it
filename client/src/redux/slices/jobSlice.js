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
    getJobsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    },
  },
});

export const { getJobs, getJobsError, getJobsSuccess } = jobSlice.actions;

export default jobSlice.reducer;
