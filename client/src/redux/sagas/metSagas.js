import { call, put, takeEvery } from "redux-saga/effects";
import { getData, setData, setError } from "redux/slices/metSlice";
import { searchImages } from "api/met";

// images watcher
function* onGetImages(action) {
  const search = action.payload?.search;
  const page = action.payload?.page;

  const { data, error } = yield call(() => searchImages(search, page));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setData(data));
  }
}

// met watchers
function* metSaga() {
  yield takeEvery(getData.type, onGetImages);
}

export default metSaga;
