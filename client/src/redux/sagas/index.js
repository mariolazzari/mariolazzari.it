// root saga
import { all } from "redux-saga/effects";
import certificationSaga from "./certificationSaga";
import socialSaga from "./socialSaga";
import skillSaga from "./skillSaga";

function* rootSaga() {
  yield all([certificationSaga(), socialSaga(), skillSaga()]);
}

export default rootSaga;
