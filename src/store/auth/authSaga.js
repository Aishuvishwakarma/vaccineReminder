import { call, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_IN,
  SEND_PASSWORD_RESET_EMAIL,
  PASSWORD_RESET,
} from "./actionType";
import {
  signInSuccess,
  signInFail,
  updateAuthLoader,
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailFail,
  resetPasswordSuccess,
  resetPasswordFail,
} from "./authAction";
import {
  loginUser,
  sendForgetPasswordEmail,
  resetPassword,
} from "../../helpers/api/authApi";
import toastr from "toastr";

function* signInSaga(action) {
  yield put(updateAuthLoader(true));
  try {
    const { data, navigate } = action.payload;
    const response = yield call(loginUser, data);
    if (response?.response_data) {
      localStorage.setItem("authUser", JSON.stringify(response.response_data));
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authRole", response.response_data.role_name);
      yield put(signInSuccess(response.response_data));
      navigate(`/${response.response_data.role_name}/dashboard`);
      toastr.success("Login Success");
    }
  } catch (error) {
    yield put(signInFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateAuthLoader(false));
  }
}

function* sendResetPasswordEmail({ email }) {
  yield put(updateAuthLoader(true));
  try {
    const response = yield call(sendForgetPasswordEmail, email);
    if (response?.response_data) {
      console.log(response.response_data, "response.response_data");
      yield put(sendPasswordResetEmailSuccess());
      toastr.success(response.message);
    }
  } catch (error) {
    yield put(sendPasswordResetEmailFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateAuthLoader(false));
  }
}

function* resetPasswordAndVerifyOtp({ payload }) {
  yield put(updateAuthLoader(true));
  try {
    const response = yield call(resetPassword, payload);
    if (response?.response_data) {
      console.log(response.response_data, "response.response_data");
      yield put(resetPasswordSuccess());
      toastr.success(response.message);
    }
  } catch (error) {
    yield put(resetPasswordFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateAuthLoader(false));
  }
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SEND_PASSWORD_RESET_EMAIL, sendResetPasswordEmail);
  yield takeLatest(PASSWORD_RESET, resetPasswordAndVerifyOtp);
}

export default watchSignIn;
