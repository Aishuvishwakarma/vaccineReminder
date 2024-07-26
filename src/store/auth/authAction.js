import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  UPDATE_AUTH_LOADER,
  SEND_PASSWORD_RESET_EMAIL,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_FAILED,
  OTP_VERIFYING,
  OTP_VERIFICATION_SUCCESS,
  OTP_VERIFICATION_FAILED,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from "./actionType";

const signIn = (data, navigate) => {
  return {
    type: SIGN_IN,
    payload: { data, navigate },
  };
};

const signInSuccess = (data) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
};

const signInFail = (error) => {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
};

const updateAuthLoader = (loader) => {
  return {
    type: UPDATE_AUTH_LOADER,
    payload: loader,
  };
};

const sendPasswordResetEmail = (email) => {
  return {
    type: SEND_PASSWORD_RESET_EMAIL,
    email,
  };
};

const sendPasswordResetEmailSuccess = (data) => {
  return {
    type: PASSWORD_RESET_EMAIL_SENT,
    payload: data,
  };
};

const sendPasswordResetEmailFail = (error) => {
  return {
    type: PASSWORD_RESET_EMAIL_FAILED,
    payload: error,
  };
};

const resetPassword = (data) => {
  return {
    type: PASSWORD_RESET,
    payload: data,
  };
};

const resetPasswordSuccess = (data) => {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload: data,
  };
};

const resetPasswordFail = (error) => {
  return {
    type: PASSWORD_RESET_FAILED,
    payload: error,
  };
};

export {
  signIn,
  signInSuccess,
  signInFail,
  updateAuthLoader,
  sendPasswordResetEmail,
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailFail,
  // verifyingOtp,
  // otpVerificationSuccess,
  // otpVerificationFail,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail
};
