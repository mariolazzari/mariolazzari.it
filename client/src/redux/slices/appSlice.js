import { createSlice } from "@reduxjs/toolkit";
// locales
import messages_EN from "locales/en.json";
import messages_IT from "locales/it.json";
// MUI icons
import HomeIcon from "@mui/icons-material/Museum";
import SkillIcon from "@mui/icons-material/LocalLibrary";
import CertificationIcon from "@mui/icons-material/School";
import HobbyIcon from "@mui/icons-material/Star";
import ContactIcon from "@mui/icons-material/ContactMail";

const initialState = {
  locale: "en",
  messages: {
    en: messages_EN,
    it: messages_IT,
  },
  drawerOpen: false,
  menuOptions: [
    {
      label: "menu.home",
      path: "/",
      // icon: <HomeIcon color="secondary" />,
    },
    {
      label: "menu.skills",
      path: "/skills",
      // icon: <SkillIcon color="secondary" />,
    },
    {
      label: "menu.certifications",
      path: "/certifications",
      // icon: <CertificationIcon color="secondary" />,
    },
    {
      label: "menu.jobs",
      path: "/jobs",
      // icon: <HobbyIcon color="secondary" />,
    },
    {
      label: "menu.hobbies",
      path: "/hobbies",
      // icon: <HobbyIcon color="secondary" />,
    },
    {
      label: "menu.contacts",
      path: "/contacts",
      // icon: <ContactIcon color="secondary" />,
    },
  ],
  selectedRoute: "/",
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
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
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
export const selectLocales = state => ({
  locale: state.app.locale,
  messages: state.app.messages,
});

// actions
export const {
  setLocale,
  setSelectedRoute,
  setDrawerOpen,
  setError,
  setSuccess,
  setFlag,
} = appSlice.actions;

export default appSlice.reducer;
