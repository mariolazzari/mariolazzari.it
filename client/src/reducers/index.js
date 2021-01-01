import { combineReducers } from "redux";
// reducers
import app from "./appReducer";
import certification from "./certificationReducer";
import social from "./socialReducer";

export default combineReducers({ app, certification, social });
