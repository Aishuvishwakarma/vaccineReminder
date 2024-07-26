import {
  GET_USER_ROLE_API_FAIL,
  GET_USER_ROLE_SUCCESS,
  UPDATE_ROLES_LOADER,
  RESET_USER_ROLES,
} from "./actionType";

const initialState = {
  roles: [],
  error: {},
  loader: false,
};

const userRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...state.roles, ...action.payload],
      };
    case GET_USER_ROLE_API_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_ROLES_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case RESET_USER_ROLES:
      return {
        roles: [],
        error: {},
        loader: false,
      };
    default:
      return state;
  }
};

export default userRoleReducer;
