import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import AppLoader from "../../components/AppLoader";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetail } from "../../store/userConfigure/userAction";
import AppForm from "../../components/AppForm";
import {
  resetUserDetail,
  updateUserDetail,
} from "../../store/userConfigure/userAction";
import {
  resetRolesUser,
  userRoles as getUserRoles,
} from "../../store/userRoles/roleAction";
import {
  getVaccineTemplateList,
  resetVaccineTemplateList,
} from "../../store/vaccineTemplates/vaccineTemplateAction";
import { formFields } from "./utils";
import moment from "moment";

export default function EditUser() {
  const [roleData, setRoleData] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    loggedInUser,
    vaccineTemplateReducer,
    roleReducer,
    userDetails,
    loader,
  } = useSelector((state) => {
    return {
      vaccineTemplateReducer: state.vaccineTemplateReducer.vaccineTemplates,
      roleReducer: state.roleReducer.roles,
      userDetails: state.configUserReducer.userDetails,
      loggedInUser: state.authReducer.user,
      loader: state.configUserReducer.loader,
    };
  });

  useEffect(() => {
    if (params.userId) {
      dispatch(getUserDetail(params.userId));
    }

    dispatch(getVaccineTemplateList());
    dispatch(getUserRoles());

    return () => {
      dispatch(resetUserDetail());
      dispatch(resetVaccineTemplateList());
      dispatch(resetRolesUser());
    };
  }, [params.userId]);

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
      updateUserDetail(
        userDetails.id,
        "editadmin",
        {
          name: formikValues.name,
          email: formikValues.email,
          date_of_birth: formikValues.date_of_birth,
          mobile_number: formikValues.mobile_number,
          status: formikValues?.status ? formikValues?.status : 1,
        },
        navigate
      )
    );
    actions.resetForm();
  };

  const fields =
    roleData &&
    vaccineTemplateReducer &&
    formFields(roleData, vaccineTemplateReducer, loggedInUser.role_name, false);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {loader ? (
          <AppLoader />
        ) : (
          <AppForm
            formTitle={`Edit ${params.userType}`}
            initialValues={{
              ...userDetails,
              date_of_birth: moment(userDetails?.date_of_birth).format(
                "YYYY-MM-DD"
              ),
            }}
            formFields={fields}
            handleFormSubmit={handleSubmit}
            showCancel={true}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}
