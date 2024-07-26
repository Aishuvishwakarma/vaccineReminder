import {
  GET_USER_ROLES,
  GET_USER_ROLE_API_FAIL,
  GET_USER_ROLE_SUCCESS,
  UPDATE_ROLES_LOADER,
  RESET_USER_ROLES,
} from "./actionType";

const userRoles = () => {
  return {
    type: GET_USER_ROLES,
  };
};

const userRoleSuccess = (data) => {
  return {
    type: GET_USER_ROLE_SUCCESS,
    payload: data,
  };
};

const userRoleApiFail = (error) => {
  return {
    type: GET_USER_ROLE_API_FAIL,
    payload: error,
  };
};

const updateRolesLoader = (loader) => {
  return {
    type: UPDATE_ROLES_LOADER,
    payload: loader,
  };
};

const resetRolesUser = () => {
  return {
    type: RESET_USER_ROLES,
  };
};

export {
  userRoles,
  userRoleSuccess,
  userRoleApiFail,
  updateRolesLoader,
  resetRolesUser,
};
