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
      state.certifications = [];
      state.loading = true;
      state.error = "";
    },
    setCertifications: (state, action) => {
      state.loading = false;
      state.certifications = action.payload;
      state.certificationsLast = action.payload.slice(0, 4);
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getCertifications, setCertifications, setError } =
  certificationSlice.actions;

export default certificationSlice.reducer;