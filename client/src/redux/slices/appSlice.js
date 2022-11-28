import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "en",
  drawerOpen: false,
  error: "",
  success: "",
  flag: "en",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

// selecors
export const selectLocale = state => state.app.locale;

// actions
export const { setLocale, setDrawerOpen, setError, setSuccess, setFlag } =
  appSlice.actions;

export default appSlice.reducer;
