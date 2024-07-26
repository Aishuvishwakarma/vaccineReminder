import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getAllRoles } from "../../helpers/api/userApi";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { createUser as onCreateUser } from "../../store/userConfigure/userAction";
import {
  resetRolesUser,
  userRoles as getUserRoles,
} from "../../store/userRoles/roleAction";
import {
  getVaccineTemplateList,
  resetVaccineTemplateList,
} from "../../store/vaccineTemplates/vaccineTemplateAction";
import moment from "moment";

const CreateUser = () => {
  const [roleData, setRoleData] = useState([]);
  const dispatch = useDispatch();

  const { loggedInUser, vaccineTemplateReducer, roleReducer } = useSelector(
    (state) => {
      return {
        loggedInUser: state.authReducer.user,
        vaccineTemplateReducer: state.vaccineTemplateReducer.vaccineTemplates,
        roleReducer: state.roleReducer.roles,
      };
    }
  );

  useEffect(() => {
    dispatch(resetVaccineTemplateList());
    dispatch(getVaccineTemplateList());
    dispatch(resetRolesUser());
    dispatch(getUserRoles());
  }, [dispatch]);

  useEffect(() => {
    if (roleReducer) {
      setRoleData(
        Array.isArray(roleReducer) &&
          roleReducer.filter((role) => role?.role_name !== "Superadmin")
      );
    }
  }, [roleReducer]);

  const handleSubmit = (formikValues, actions) => {
    dispatch(
      onCreateUser({
        ...formikValues,
        created_by: loggedInUser.id,
        parent_id: loggedInUser.id,
        logged_in_id: loggedInUser.id,
        role_id: Number(formikValues.role_id),
        created_date: moment().format("YYYY-MM-DD"),
      })
    );
    dispatch(getVaccineTemplateList());
    actions.resetForm(); 
  };

  const fields =
    roleData &&
    vaccineTemplateReducer &&
    formFields(roleData, vaccineTemplateReducer, loggedInUser.role_name);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <AppForm
        formTitle="Create User"
        initialValues={{
          name: "",
          email: "",
          password: "",
          roleId:""
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CreateUser;
