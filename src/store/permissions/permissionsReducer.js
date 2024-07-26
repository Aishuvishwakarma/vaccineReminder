import {
  GET_PERMISSIONS_SUCCESS,
  GET_MY_PERMISSIONS_SUCCESS,
  PERMISSIONS_API_FAIL,
  RESET_PERMISSIONS,
  UPDATE_PERMISSIONS_LOADER,
  UPDATE_PERMISSIONS_SUCCESS,
} from "./actionType";

const initialState = {
  permissions: [],
  myPermissions: [],
  permissionDetails: {},
  error: {},
  loader: false,
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: [...state.permissions, ...action.payload],
      };
      case GET_MY_PERMISSIONS_SUCCESS:
      return {
        ...state,
        myPermissions: [...state.myPermissions, ...action.payload],
      };
    case UPDATE_PERMISSIONS_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        // permissions: [...state.permissions, ...action.payload],
      };
    case PERMISSIONS_API_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_PERMISSIONS_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case RESET_PERMISSIONS:
      return {
        permissions: [],
        myPermissions: [],
        permissionDetails: {},
        error: {},
        loader: false,
      };
    default:
      return state;
  }
};

export default permissionReducer;
