// Redux store
import { configureStore } from "@reduxjs/toolkit";
import createSaga from "redux-saga";
// root reducer and saga
import rootReducer from "./slices";
import rootSaga from "./sagas";

// sagas
const saga = createSaga();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(saga),
});

saga.run(rootSaga);

// export store
export default store;
