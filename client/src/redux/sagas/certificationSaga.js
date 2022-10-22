import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCertifications,
  getCertificationsSuccess,
  getCertificationsError,
} from "redux/slices/certificationSlice";
import api from "api/local";

function* onGetCertifications() {
  const { data, error } = yield call(() =>
    api.get("/certifications?sort=-date")
  );

  if (error) {
    yield put(getCertificationsError(error));
  } else {
    yield put(getCertificationsSuccess(data.results));
  }
}

function* certificationSaga() {
  yield takeEvery(getCertifications.type, onGetCertifications);
}

export default certificationSaga;
