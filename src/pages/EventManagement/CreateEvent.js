import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
// import AppLoader from "../../components/AppLoader";
import { useParams, useNavigate } from "react-router-dom";
// import ConfirmationDialog from "../../components/AppDialog";
import { useDispatch, useSelector } from "react-redux";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";

import { userRoles as getUserRoles } from "../../store/userRoles/roleAction";

function CreateEvent() {
  const [roleData, setRoleData] = useState([]);

  // const [dynamicList, setDynamicList] = useState([]);
  // const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { id } = useParams();

  const { roles } = useSelector((state) => {
    return {
      // loggedInUser: state.authReducer.user,
      // vaccineTemplateReducer: state.vaccineTemplateReducer.vaccineTemplates,
      roles: state.roleReducer.roles,
    };
  });

  // useEffect(() => {
  //   // dispatch(resetVaccineTemplateList());
  //   // dispatch(getVaccineTemplateList());
  //   // dispatch(resetRolesUser());
  //   dispatch(getUserRoles());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (roleReducer) {
  //     setRoleData(
  //       Array.isArray(roleReducer) &&
  //         roleReducer.filter((role) => role?.role_name !== "Superadmin")
  //     );
  //   }
  // }, [roleReducer]);

  const handleSubmit = (formikValues, actions) => {};

  const fields = roleData && formFields(roleData);
// 
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <AppForm
        formTitle="Create Event"
        initialValues={{
          title: "",
          descriptions: "",
          start_date: "",
          end_date: "",
          roleId: "",
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
      />
    </Box>
  );
}

export default CreateEvent;
