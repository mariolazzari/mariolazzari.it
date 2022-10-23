import { call, put, takeEvery } from "redux-saga/effects";
import { getPods, getPodsError, getPodsSuccess } from "redux/slices/nasaSlice";
import api from "api/nasa";

// nasa pods worker
function* onGetPods(action) {
  console.log(action);
  console.log(action.type);
  console.log(action.payload);

  const { data, error } = yield call(() => api.getPods(action.payload));
  if (error) {
    yield put(getPodsError(error));
  } else {
    yield put(getPodsSuccess(data));
  }
}

// nasa watcher
function* nasaSaga() {
  yield takeEvery(getPods.type, onGetPods);
}

export default nasaSaga;
