import { call, put, takeEvery } from "redux-saga/effects";
import { getPods, setError, setPods } from "redux/slices/nasaSlice";
import api from "api/nasa";

// nasa pods worker
function* onGetPods(action) {
  const { data, error } = yield call(() => api.pods(action.payload));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setPods(data));
  }
}

// nasa watcher
function* nasaSaga() {
  yield takeEvery(getPods.type, onGetPods);
}

export default nasaSaga;
