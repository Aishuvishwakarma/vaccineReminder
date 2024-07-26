import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_VACCINE_TEMPLATES,
  DELETE_VACCINE_TEMPLATES,
  CREATRE_VACCINE_TEMPLATES,
} from "./actionType";
import {
  getVaccineTemplateListSuccess,
  vaccineTemplateApiFail,
  updateVaccineTemplateLoader,
  createVaccineTemplateListSuccess,
  deleteVaccineTemplateSuccess
} from "./vaccineTemplateAction";
import {
  getVaccineTemplates,
  createVaccineTemplatesApi,
  deleteVaccineTemplatesApi,
} from "../../helpers/api/vaccineTemplateApi";
import toastr from "toastr";

function* fetchVaccineTemplates() {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(getVaccineTemplates);
    yield put(getVaccineTemplateListSuccess(response.response_data));
    // toastr.success(response.message);
  } catch (error) {
    yield put(vaccineTemplateApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateVaccineTemplateLoader(false));
  }
}

function* createVaccineTemplates({ payload: { data, history } }) {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(createVaccineTemplatesApi, data);
    toastr.success(response.message);
    yield put(createVaccineTemplateListSuccess(data?.vaccines));
    setTimeout(() => {
      history(-1);
    }, 1000);
  } catch (error) {
    yield put(vaccineTemplateApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateVaccineTemplateLoader(false));
  }
}

function* deleteVaccineTemplates({ payload: { vaccineId } }) {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(deleteVaccineTemplatesApi, vaccineId);
    toastr.success(response.message);
    yield put(deleteVaccineTemplateSuccess(vaccineId));
  } catch (error) {
    yield put(vaccineTemplateApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateVaccineTemplateLoader(false));
  }
}

function* watchVaccineTemplateSaga() {
  yield takeLatest(GET_VACCINE_TEMPLATES, fetchVaccineTemplates);
  yield takeLatest(CREATRE_VACCINE_TEMPLATES, createVaccineTemplates);
  yield takeLatest(DELETE_VACCINE_TEMPLATES, deleteVaccineTemplates);
}

export default watchVaccineTemplateSaga;
