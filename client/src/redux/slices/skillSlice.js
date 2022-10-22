import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  skillsLoading: false,
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
};

// skill slice
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    getSkills: (state, action) => {
      state.skillsLoading = true;
    },
  },
});

export const { getSkills } = skillSlice.actions;

export default skillSlice.reducer;
