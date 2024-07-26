import {
  GET_VACCINE_TEMPLATES_SUCCESS,
  VACCINE_TEMPLATES_API_FAIL,
  UPDATE_VACCINE_TEMPLATES_LOADER,
  RESET_VACCINE_TEMPLATES,
  CREATRE_VACCINE_TEMPLATES_SUCCESS,
  DELETE_VACCINE_TEMPLATES_SUCCESS,
} from "./actionType";

const initialState = {
  vaccineTemplates: [],
  vaccineTemplateDetails: {},
  error: {},
  loader: false,
};

const vaccineTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VACCINE_TEMPLATES_SUCCESS:
      return {
        ...state,
        vaccineTemplates: [...state.vaccineTemplates, ...action.payload],
      };
    case VACCINE_TEMPLATES_API_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case CREATRE_VACCINE_TEMPLATES_SUCCESS:
      return {
        ...state,
        vaccineTemplates: [...state.vaccineTemplates, ...action.payload],
      };
    case UPDATE_VACCINE_TEMPLATES_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case DELETE_VACCINE_TEMPLATES_SUCCESS:
      return {
        ...state,
        vaccineTemplates: state.vaccineTemplates.filter(
          (vaccineTemplate) => vaccineTemplate.id !== action.payload
        ),
      };
    case RESET_VACCINE_TEMPLATES:
      return {
        ...state,
        vaccineTemplates: [],
        vaccineTemplateDetails: {},
        error: {},
        loader: false,
      };
    default:
      return state;
  }
};

export default vaccineTemplateReducer;
