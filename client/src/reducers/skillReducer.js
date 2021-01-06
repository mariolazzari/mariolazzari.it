import { GET_SKILLS } from "../actions/types";

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
};

// skill reducer
const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SKILLS:
      // filetr skills by type
      const os = action.payload.filter(s => s.type === "os");
      const lang = action.payload.filter(s => s.type === "lang");
      const db = action.payload.filter(s => s.type === "db");
      const ide = action.payload.filter(s => s.type === "ide");
      const lib = action.payload.filter(s => s.type === "lib");
      const tool = action.payload.filter(s => s.type === "tool");
      return { ...state, os, lang, db, ide, lib, tool };

    default:
      return state;
  }
};

// export reducer
export default skillReducer;