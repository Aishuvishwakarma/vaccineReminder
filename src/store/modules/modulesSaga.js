import { call, put, takeLatest } from "redux-saga/effects";
import { GET_MODULE } from "./actionType";
import {
  resetModules,
  getModulesSuccess,
  moduleApiFail,
  updateModuleLoader,
} from "./modulesAction";
import { getModules } from "../../helpers/api/commonApi";
import toastr from "toastr";

function* fetchModules() {
  yield put(resetModules());
  yield put(updateModuleLoader(true));
  try {
    const response = yield call(getModules);
    yield put(getModulesSuccess(response.response_data));
  } catch (error) {
    yield put(moduleApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateModuleLoader(false));
  }
}

function* watchModulesSaga() {
  yield takeLatest(GET_MODULE, fetchModules);
}

export default watchModulesSaga;
