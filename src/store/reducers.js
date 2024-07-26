import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import configUserReducer from "./userConfigure/configUserReducer";
import vaccineTemplateReducer from "./vaccineTemplates/vaccineTemplateReducer";
import roleReducer from "./userRoles/roleReducer";
import modulesReducer from "./modules/modulesReducer";
import permissionsReducer from "./permissions/permissionsReducer";


const rootReducer = combineReducers({
  authReducer,
  configUserReducer,
  vaccineTemplateReducer,
  roleReducer,
  modulesReducer,
  permissionsReducer
});

export default rootReducer;
