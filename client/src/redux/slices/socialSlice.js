import { createSlice } from "@reduxjs/toolkit";

// intital state
const initialState = {
  mail: "mario.lazzari@gmail.com",
  mailTo: "mailto:mario.lazzari@gmail.com",
  socials: [],
  loading: false,
  error: "",
};

// social slice
const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    getSocials: state => {
      state.socialsLoading = true;
      state.error = "";
    },
    getSocialsSccess: (state, action) => {
      state.socials = action.payload;
      state.socialsLoading = true;
      state.error = "";
    },
    getSocialsError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});
export const { getSocials, getSocialsSccess, getSocialsError } =
  socialSlice.actions;

export default socialSlice.reducer;
