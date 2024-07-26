import {
  GET_MODULE,
  GET_MODULE_SUCCESS,
  RESET_MODULE,
  MODULE_API_FAIL,
  UPDATE_MODULE_LOADER,
} from "./actionType";

const getModules = () => {
  return {
    type: GET_MODULE,
  };
};

const getModulesSuccess = (data) => {
  return {
    type: GET_MODULE_SUCCESS,
    payload: data,
  };
};

const moduleApiFail = (error) => {
  return {
    type: MODULE_API_FAIL,
    payload: error,
  };
};

const resetModules = () => {
  return {
    type: RESET_MODULE,
  };
};

const updateModuleLoader = (loader) => {
  return {
    type: UPDATE_MODULE_LOADER,
    payload: loader,
  };
};

export {
  getModules,
  getModulesSuccess,
  resetModules,
  moduleApiFail,
  updateModuleLoader,
};
