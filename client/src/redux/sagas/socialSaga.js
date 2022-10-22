import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSocials,
  getSocialsSccess,
  getSocialsError,
} from "redux/slices/socialSlice";
import api from "api/local";

function* onGetSocial() {
  const { data, error } = yield call(() => api.get("/socials"));
  if (error) {
    yield put(getSocialsError(error));
  } else {
    yield put(getSocialsSccess(data.results));
  }
}

function* socialSaga() {
  yield takeEvery(getSocials.type, onGetSocial);
}

export default socialSaga;
