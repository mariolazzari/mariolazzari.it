import { call, put, takeEvery } from "redux-saga/effects";
import { getData, setError, setData } from "redux/slices/rijksSlice";
import api from "api/rijks";

// nasa pods worker
function* onGetData(action) {
  const { search, page } = action.payload;
  const { data, error } = yield call(() => api.getCollection(search, page));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setData(data));
  }
}

// nasa watcher
function* nasaSaga() {
  yield takeEvery(getData.type, onGetData);
}

export default nasaSaga;
