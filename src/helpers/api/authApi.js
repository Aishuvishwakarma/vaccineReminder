import { post } from "../api_helper";
import { USER_ROUTES, LOGIN, REGISTER } from "../constant";

const loginUser = async (userData) =>
  await post(`${USER_ROUTES + LOGIN}`, userData);

const registerUser = async (data) =>
  await post(`${USER_ROUTES + REGISTER}`, { ...data });

const sendForgetPasswordEmail = async (email) =>
  await post(`${USER_ROUTES + "/sendchangepasswordotp"}`, { email });

// const verifyOtp = async (otpData) =>
//   await post(`${USER_ROUTES}` + "/auth/verify-otp", otpData);

const resetPassword = async (passwordData) =>
  await post(`${USER_ROUTES}` + "/resetpassword", passwordData);

export {
  loginUser,
  registerUser,
  sendForgetPasswordEmail,
//   verifyOtp,
  resetPassword,
};

// localhost:8071/api/user/forgotpassword
// localhost:8071/api/user/resetpassword
// sendchangepasswordotp
// localhost:8071/api/user/forgotpassword
// localhost:8071/api/user/resetpassword
// For reset password, the request should be POST having email, otp and new_password field
