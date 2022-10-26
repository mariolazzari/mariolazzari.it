import { call, put, takeEvery } from "redux-saga/effects";
import { getRijks, setError, setRijks } from "redux/slices/rijksSlice";
import api from "api/rijks";

// nasa pods worker
function* onGetRijks(action) {
  const { data, error } = yield call(() => api.getCollection(action.payload));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setRijks(data));
  }
}

// nasa watcher
function* nasaSaga() {
  yield takeEvery(getRijks.type, onGetRijks);
}

export default nasaSaga;
