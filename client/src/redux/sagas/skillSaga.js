import { call, put, takeEvery } from "redux-saga/effects";
import { getSkills, setError, setSkills } from "redux/slices/skillSlice";
import api from "api/local";

// skills worker
function* onGetSkills() {
  const { data, error } = yield call(() => api.get("/skills"));
  if (error) {
    yield put(setError(error));
  } else {
    yield put(setSkills(data.results));
  }
}

// saga watchers
function* skillSaga() {
  yield takeEvery(getSkills.type, onGetSkills);
}

export default skillSaga;
