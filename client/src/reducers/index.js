import { combineReducers } from "redux";
// reducers
import app from "./appReducer";
import certification from "./certificationReducer";
import job from "./jobReducer";
import skill from "./skillReducer";
import social from "./socialReducer";

export default combineReducers({ app, certification, job, skill, social });
