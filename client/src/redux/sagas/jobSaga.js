import { call, put, takeEvery } from "redux-saga/effects";
import { getJobs, setJobs, setError } from "redux/slices/jobSlice";
import api from "api/local";

// job watcher
function* onGetJobs() {
  const { data, error } = yield call(() => api.get("/jobs"));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setJobs(data.results));
  }
}

// job watcher
function* jobSaga() {
  yield takeEvery(getJobs.type, onGetJobs);
}

export default jobSaga;
