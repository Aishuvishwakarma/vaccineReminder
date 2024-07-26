import {
  GET_VACCINE_TEMPLATES,
  GET_VACCINE_TEMPLATES_SUCCESS,
  VACCINE_TEMPLATES_API_FAIL,
  UPDATE_VACCINE_TEMPLATES_LOADER,
  RESET_VACCINE_TEMPLATES,
  CREATRE_VACCINE_TEMPLATES,
  CREATRE_VACCINE_TEMPLATES_SUCCESS,
  DELETE_VACCINE_TEMPLATES,
  DELETE_VACCINE_TEMPLATES_SUCCESS
} from "./actionType";

const getVaccineTemplateList = () => {
  return {
    type: GET_VACCINE_TEMPLATES,
  };
};

const getVaccineTemplateListSuccess = (data) => {
  return {
    type: GET_VACCINE_TEMPLATES_SUCCESS,
    payload: data,
  };
};

const vaccineTemplateApiFail = (error) => {
  return {
    type: VACCINE_TEMPLATES_API_FAIL,
    payload: error,
  };
};

const updateVaccineTemplateLoader = (loader) => {
  return {
    type: UPDATE_VACCINE_TEMPLATES_LOADER,
    payload: loader,
  };
};

const createVaccineTemplateList = (data, history) => {
  return {
    type: CREATRE_VACCINE_TEMPLATES,
    payload: {
      data,
      history,
    },
  };
};

const createVaccineTemplateListSuccess = (data) => {
  return {
    type: CREATRE_VACCINE_TEMPLATES_SUCCESS,
    payload: data,
  };
};

const deleteVaccineTemplate = (vaccineId) => {
  return {
    type: CREATRE_VACCINE_TEMPLATES,
    payload: {
      vaccineId,
    },
  };
};

const deleteVaccineTemplateSuccess = (vaccineId) => {
  return {
    type: CREATRE_VACCINE_TEMPLATES_SUCCESS,
    payload: vaccineId,
  };
};

const resetVaccineTemplateList = () => {
  return {
    type: RESET_VACCINE_TEMPLATES,
  };
};

export {
  getVaccineTemplateList,
  getVaccineTemplateListSuccess,
  vaccineTemplateApiFail,
  updateVaccineTemplateLoader,
  resetVaccineTemplateList,
  createVaccineTemplateList,
  createVaccineTemplateListSuccess,
  deleteVaccineTemplate,
  deleteVaccineTemplateSuccess
};
