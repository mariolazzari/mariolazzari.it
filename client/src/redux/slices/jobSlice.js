import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  jobs: [],
  jobsLoading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getJobs: (state, action) => {
      state.jobsLoading = true;
    },
  },
});

export const { getJobs } = jobSlice.actions;

export default jobSlice.reducer;
