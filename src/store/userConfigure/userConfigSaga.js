import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_USER,
  GET_USER_LIST,
  GET_USER_DETAIL,
  UPDATE_USER_DETAILS,
  DELETE_USER,
} from "./actionType";
import {
  createUserSuccess,
  getUserDetailSuccess,
  userApiFail,
  updateUserLoader,
  updateUserDetailSuccess,
  getUserListSuccess,
  deleteUserSuccess,
} from "./userAction";
import { registerUser } from "../../helpers/api/authApi";
import {
  getUserDetailsApi,
  updateUserDetailsApi,
  getAllUserByRoleApi,
  getAllUserApi,
  deleteUserApi,
} from "../../helpers/api/userApi";
import toastr from "toastr";

function* createUserSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    // const {  navigate } = payload;
    const response = yield call(registerUser, payload);
    yield put(createUserSuccess(response.response_data));
    toastr.success("Create User Success");
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* getUserSaga({ payload: { role, authRole } }) {
  yield put(updateUserLoader(true));
  try {
    if(authRole==="Superadmin"){
      const response = yield call(getAllUserByRoleApi, role);
      const responseData = response.response_data;
      yield put(getUserListSuccess({ dynamicList: responseData }));
    }else{
      const response = yield call(getAllUserApi, role);
      console.log(response,role)
      const responseData = response.response_data;
      yield put(getUserListSuccess({ dynamicList: responseData }));
    }
    // if (role == "admin") {
    //   yield put(getUserListSuccess({ adminList: responseData }));
    // } else if (role == "staff") {
    //   yield put(getUserListSuccess({ staffList: responseData }));
    // } else if (role === "doctor") {
    //   yield put(getUserListSuccess({ doctorList: responseData }));
    // } else {
    //   yield put(getUserListSuccess({ userList: responseData }));
    // }
  } catch (error) {
    yield put(userApiFail(error));
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* getUserDetailSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    const { userId } = payload;
    const response = yield call(getUserDetailsApi, userId);
    yield put(getUserDetailSuccess(response.response_data));
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* updateUserDetailSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    const { userId, data, slug, navigate } = payload;
    const response = yield call(updateUserDetailsApi, slug, {
      ...data,
      user_id: userId,
    });
    yield put(updateUserDetailSuccess(response.response_data));
    toastr.success(response.message);
    navigate &&
      setTimeout(() => {
        navigate(-1);
      }, 1000);
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* deleteUserSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    const { userId, role } = payload;
    const response = yield call(deleteUserApi, userId, role);
    toastr.success("User deleted successfully");
    yield put(deleteUserSuccess(response.response_data));
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* watchCreateUser() {
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(GET_USER_LIST, getUserSaga);
  yield takeLatest(GET_USER_DETAIL, getUserDetailSaga);
  yield takeLatest(UPDATE_USER_DETAILS, updateUserDetailSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga); // Add watcher for DELETE_USER
}

export default watchCreateUser;
