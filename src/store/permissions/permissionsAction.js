import {
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_MY_PERMISSIONS,
  GET_MY_PERMISSIONS_SUCCESS,
  RESET_PERMISSIONS,
  PERMISSIONS_API_FAIL,
  UPDATE_PERMISSIONS_LOADER,
  UPDATE_PERMISSIONS,
  UPDATE_PERMISSIONS_SUCCESS,
} from "./actionType";

const getPermissions = () => {
  return {
    type: GET_PERMISSIONS,
  };
};

const getPermissionsSuccess = (data) => {
  return {
    type: GET_PERMISSIONS_SUCCESS,
    payload: data,
  };
};

const getMyPermissions = () => {
  return {
    type: GET_MY_PERMISSIONS,
  };
};

const getMyPermissionsSuccess = (data) => {
  return {
    type: GET_MY_PERMISSIONS_SUCCESS,
    payload: data,
  };
};

const permissionApiFail = (error) => {
  return {
    type: PERMISSIONS_API_FAIL,
    payload: error,
  };
};

const resetPermissions = () => {
  return {
    type: RESET_PERMISSIONS,
  };
};

const updatePermissionLoader = (loader) => {
  return {
    type: UPDATE_PERMISSIONS_LOADER,
    payload: loader,
  };
};

const updatePermission = (data) => {
  return {
    type: UPDATE_PERMISSIONS,
    payload: {data},
  };
};

const updatePermissionSuccess = (data) => {
  return {
    type: UPDATE_PERMISSIONS_SUCCESS,
    payload: data,
  };
};

export {
  getPermissions,
  getPermissionsSuccess,
  getMyPermissions,
  getMyPermissionsSuccess,
  resetPermissions,
  permissionApiFail,
  updatePermissionLoader,
  updatePermission,
  updatePermissionSuccess,
};
