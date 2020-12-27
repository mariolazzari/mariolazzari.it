import { combineReducers } from "redux";
import app from "./appReducer";
import certification from "./certificationReducer";

export default combineReducers({ app, certification });
