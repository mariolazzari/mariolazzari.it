import { call, put, takeEvery } from "redux-saga/effects";
import { getSocials, setSocials, setError } from "redux/slices/socialSlice";
import api from "api/local";

function* onGetSocial() {
  const { data, error } = yield call(() => api.get("/socials"));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setSocials(data.results));
  }
}

function* socialSaga() {
  yield takeEvery(getSocials.type, onGetSocial);
}

export default socialSaga;
