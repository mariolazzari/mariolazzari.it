import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPods,
  setPods,
  getNeos,
  setNeos,
  setError,
} from "redux/slices/nasaSlice";
import api from "api/nasa";

// nasa pods worker
function* onGetPods(action) {
  console.log("saga", action);

  const from = action.payload?.from || "";
  const to = action.payload?.to || "";
  const count = action.payload?.count || 0;

  const { data, error } = yield call(() => api.pods(from, to, count));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setPods(data));
  }
}

// nasa neos worker
function* onGetNeos(action) {
  const from = action.payload?.from || "";
  const to = action.payload?.to || "";

  const { data, error } = yield call(() => api.neos(from, to));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setNeos(data));
  }
}

// nasa watcher
function* nasaSaga() {
  yield takeEvery(getPods.type, onGetPods);
  yield takeEvery(getNeos.type, onGetNeos);
}

export default nasaSaga;
