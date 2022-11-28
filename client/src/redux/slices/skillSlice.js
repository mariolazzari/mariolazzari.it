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
      url: "https://mongodb.com/",
    },
    {
      avatar: "/images/logos/express.png",
      title: "home.expressTitle",
      text: "home.expressText",
      url: "https://expressjs.com/",
    },
    {
      avatar: "/images/logos/reactjs.png",
      title: "home.reactTitle",
      text: "home.reactText",
      url: "https://reactjs.com/",
    },
    {
      avatar: "/images/logos/nodejs.png",
      title: "home.nodeTitle",
      text: "home.nodeText",
      url: "https://nodejs.org/",
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

// selectrs
export const selectSkills = state => ({
  locale: state.app.locale,
  os: state.skill.os,
  lang: state.skill.lang,
  db: state.skill.db,
  ide: state.skill.ide,
  lib: state.skill.lib,
  tool: state.skill.tool,
});

// actions
export const { getSkills, setError, setSkills } = skillSlice.actions;

export default skillSlice.reducer;
