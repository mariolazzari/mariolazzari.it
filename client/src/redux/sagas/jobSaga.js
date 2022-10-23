import { call, put, takeEvery } from "redux-saga/effects";
import { getJobs, getJobsError, getJobsSuccess } from "redux/slices/jobSlice";
import api from "api/local";

// job watcher
function* onGetJobs() {
  const { data, error } = yield call(() => api.get("/jobs"));
  if (error) {
    yield put(getJobsError(error));
  } else {
    yield put(getJobsSuccess(data.results));
  }
}

// job watcher
function* jobSaga() {
  yield takeEvery(getJobs.type, onGetJobs);
}

export default jobSaga;
