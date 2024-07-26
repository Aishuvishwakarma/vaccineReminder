import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  USER_API_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  UPDATE_USERS_LOADER,
  GET_USER_DETAIL,
  GET_USER_DETAIL_SUCCESS,
  RESET_USER_DETAILS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
} from "./actionType";

const getUserList = (role, authRole) => {
  return {
    type: GET_USER_LIST,
    payload: { role, authRole },
  };
};

const getUserListSuccess = (data) => {
  return {
    type: GET_USER_LIST_SUCCESS,
    payload: data,
  };
};

const createUser = (data) => {
  return {
    type: CREATE_USER,
    payload: data,
  };
};

const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};

const userApiFail = (error) => {
  return {
    type: USER_API_FAIL,
    payload: error,
  };
};

const updateUserLoader = (loader) => {
  return {
    type: UPDATE_USERS_LOADER,
    payload: loader,
  };
};

const getUserDetail = (userId) => {
  return {
    type: GET_USER_DETAIL,
    payload: { userId },
  };
};

const getUserDetailSuccess = (data) => {
  return {
    type: GET_USER_DETAIL_SUCCESS,
    payload: data,
  };
};

const resetUserDetail = () => {
  return {
    type: RESET_USER_DETAILS,
  };
};

const updateUserDetail = (userId, slug, data, navigate = "") => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: { userId, slug, data, navigate },
  };
};

const updateUserDetailSuccess = (data) => {
  return {
    type: UPDATE_USER_DETAILS_SUCCESS,
    payload: data,
  };
};

const deleteUser = (userId, role) => {
  return {
    type: DELETE_USER,
    payload: { userId, role },
  };
};

const deleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: data,
  };
};

export {
  getUserList,
  getUserListSuccess,
  createUser,
  createUserSuccess,
  userApiFail,
  updateUserLoader,
  getUserDetail,
  getUserDetailSuccess,
  resetUserDetail,
  updateUserDetail,
  updateUserDetailSuccess,
  deleteUser,
  deleteUserSuccess,
};
