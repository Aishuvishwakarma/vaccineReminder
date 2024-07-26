import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  UPDATE_AUTH_LOADER,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from "./actionType";

const initialState = {
  user: {},
  error: {},
  loader: false,
  passwordResetStatus: null,
  otpVerificationStatus: null,
  passwordResetSuccess: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_AUTH_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case PASSWORD_RESET_EMAIL_SENT:
      return {
        ...state,
        passwordResetStatus: "success",
      };
    case PASSWORD_RESET_EMAIL_FAILED:
      return {
        ...state,
        passwordResetStatus: "failed",
        error: { ...action.payload },
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetSuccess: "success",
      };
    case PASSWORD_RESET_FAILED:
      return {
        ...state,
        passwordResetSuccess: "failed",
        error: { ...action.payload },
      };
    default:
      return state;
  }
};

export default authReducer;
