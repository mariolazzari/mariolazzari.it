// root saga
import { all } from "redux-saga/effects";
import certificationSaga from "./certificationSaga";
import socialSaga from "./socialSaga";

function* rootSaga() {
  yield all([certificationSaga(), socialSaga()]);
}

export default rootSaga;
