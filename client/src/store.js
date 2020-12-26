// Redux store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// root reducer
import rootReducer from "./reducers";

// middlewares
const middlewares = [thunk];

// export store
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
