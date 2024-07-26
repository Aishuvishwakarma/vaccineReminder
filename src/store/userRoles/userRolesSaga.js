import { call, put, takeLatest } from "redux-saga/effects";
import { GET_USER_ROLES } from "./actionType";
import {
  resetRolesUser,
  userRoleSuccess,
  userRoleApiFail,
  updateRolesLoader,
} from "./roleAction";
import { getAllRoles } from "../../helpers/api/userApi";
import toastr from "toastr";

function* fetchUserRolesSaga() {
  yield put(resetRolesUser());
  yield put(updateRolesLoader(true));
  try {
    const response = yield call(getAllRoles);
    yield put(userRoleSuccess(response.response_data));
  } catch (error) {
    yield put(userRoleApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateRolesLoader(false));
  }
}

function* watchUserRolesSaga() {
  yield takeLatest(GET_USER_ROLES, fetchUserRolesSaga);
}

export default watchUserRolesSaga;
