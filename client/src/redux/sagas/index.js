// root saga
import { all } from "redux-saga/effects";
import certificationSaga from "./certificationSaga";
import jobSaga from "./jobSaga";
import nasaSaga from "./nasaSaga";
import rijksSaga from "./rijksSaga";
import socialSaga from "./socialSaga";
import skillSaga from "./skillSaga";

function* rootSaga() {
  yield all([
    certificationSaga(),
    jobSaga(),
    nasaSaga(),
    rijksSaga(),
    socialSaga(),
    skillSaga(),
  ]);
}

export default rootSaga;
