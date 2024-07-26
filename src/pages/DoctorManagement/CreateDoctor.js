import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getAllRoles } from "../../helpers/api/userApi";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";

const CreateDoctor = () => {
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRoles();
      if (roles?.response_data) {
        setRoleData(roles.response_data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (formikValues, formik) => {
    console.log(formikValues,formik,"Submit")
    // formik.validateForm().then((errors) => {
    //   if (Object.keys(errors).length === 0) {
    //     console.log(formikValues, "formikValues>>");
    //   } else {
    //     const touchedFields = {};
    //     Object.keys(errors).forEach((field) => {
    //       touchedFields[field] = true;
    //     });
    //     formik.setTouched(touchedFields);
    //     console.log("Validation errors:", errors);
    //   }
    // });
  };

  const fields = formFields(roleData);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <AppForm
        formTitle="Create Doctor"
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CreateDoctor;
