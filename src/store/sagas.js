import { all } from 'redux-saga/effects';
import watchSignIn from './auth/authSaga';
import watchCreateUser from './userConfigure/userConfigSaga';
import watchVaccineTemplateSaga from "./vaccineTemplates/vaccineTemplateSaga";
import watchUserRolesSaga from "./userRoles/userRolesSaga";
import watchModulesSaga from "./modules/modulesSaga";
import watchPermissionSaga from "./permissions/permissionsSaga";

function* rootSaga() {
  yield all([
    watchSignIn(),
    watchCreateUser(),
    watchVaccineTemplateSaga(),
    watchUserRolesSaga(),
    watchModulesSaga(),
    watchPermissionSaga()
    // add other sagas here
  ]);
}

export default rootSaga;
