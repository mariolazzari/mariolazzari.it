import { GET_SKILLS } from "../actions/types";

// initial state
const initialState = {
  os: [],
  lang: [],
  db: [],
  ide: [],
  lib: [],
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

      return { ...state, skills: action.payload, os, lang, db, ide, lib };

    default:
      return state;
  }
};

// export reducer
export default skillReducer;
