import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  certifications: [],
  certificationsLast: [],
  loading: false,
  error: "",
};

const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    getCertifications: state => {
      state.loading = true;
      state.error = "";
    },
    getCertificationsSuccess: (state, action) => {
      state.loading = false;
      state.certifications = action.payload;
      state.certificationsLast = action.payload.slice(0, 4);
    },
    getCertificationsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCertifications,
  getCertificationsSuccess,
  getCertificationsError,
} = certificationSlice.actions;

export default certificationSlice.reducer;
