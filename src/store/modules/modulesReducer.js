import {
  GET_MODULE_SUCCESS,
  MODULE_API_FAIL,
  RESET_MODULE,
  UPDATE_MODULE_LOADER
} from "./actionType";

const initialState = {
  modules: [],
  moduleDetails: {},
  error: {},
  loader: false,
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODULE_SUCCESS:
      return {
        ...state,
        modules: [...state.modules, ...action.payload],
      };
    case MODULE_API_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_MODULE_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case RESET_MODULE:
      return {
        modules: [],
        moduleDetails: {},
        error: {},
        loader: false,
      };
    default:
      return state;
  }
};

export default moduleReducer;
