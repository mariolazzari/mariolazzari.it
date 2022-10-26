import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  os: [],
  lang: [],
  db: [],
  ide: [],
  lib: [],
  tool: [],
  main: [
    {
      avatar: "/images/logos/mongodb.png",
      title: "home.mongoTitle",
      text: "home.mongoText",
      onClick: () => window.open("https://mongodb.com/", "_blank"),
    },
    {
      avatar: "/images/logos/express.png",
      title: "home.expressTitle",
      text: "home.expressText",
      onClick: () => window.open("https://expressjs.com/", "_blank"),
    },
    {
      avatar: "/images/logos/reactjs.png",
      title: "home.reactTitle",
      text: "home.reactText",
      onClick: () => window.open("https://reactjs.com/", "_blank"),
    },
    {
      avatar: "/images/logos/nodejs.png",
      title: "home.nodeTitle",
      text: "home.nodeText",
      onClick: () => window.open("https://nodejs.org/", "_blank"),
    },
  ],
  loading: false,
  error: "",
};

// skill slice
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    getSkills: state => {
      state.loading = true;
    },
    setSkills: (state, action) => {
      state.loading = false;
      // filetr skills by type
      state.os = action.payload.filter(s => s.type === "os");
      state.lang = action.payload.filter(s => s.type === "lang");
      state.db = action.payload.filter(s => s.type === "db");
      state.ide = action.payload.filter(s => s.type === "ide");
      state.lib = action.payload.filter(s => s.type === "lib");
      state.tool = action.payload.filter(s => s.type === "tool");
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSkills, setError, setSkills } = skillSlice.actions;

export default skillSlice.reducer;
