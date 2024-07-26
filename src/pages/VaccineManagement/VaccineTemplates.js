import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import AppTable from "../../components/AppTable";
import AppLoader from "../../components/AppLoader";
import {
  getVaccineTemplateList,
  resetVaccineTemplateList,
  deleteVaccineTemplate
} from "../../store/vaccineTemplates/vaccineTemplateAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationDialog from "../../components/AppDialog";

const columns = [
  {
    Header: "NAME",
    accessor: "name",
    label: "NAME",
  },
  {
    Header: "IS MANDATORY",
    accessor: "is_mandatory",
    label: "IS MANDATORY",
  },
  {
    Header: "CREATED BY",
    accessor: "created_by",
    label: "CREATED BY",
  },
  {
    Header: "DATE",
    accessor: "created_date",
    label: "Date",
  },
];

export default function VaccineTemplateList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { vaccineTemplateReducer } = useSelector((state) => {
    return {
      vaccineTemplateReducer: state.vaccineTemplateReducer.vaccineTemplates,
    };
  });

  const [vaccineTemplates, setVaccineTemplates] = useState([]);
  useEffect(() => {
    dispatch(resetVaccineTemplateList());
    getdata();
    return () => {
      dispatch(resetVaccineTemplateList());
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(vaccineTemplateReducer) && vaccineTemplateReducer) {
      setVaccineTemplates(
        vaccineTemplateReducer.map((response) => ({
          ...response,
          is_mandatory: response.is_mandatory ? "Yes" : "No",
          vaccine_frequency: response.vaccine_frequency + " Days",
        }))
      );
    }
  }, [vaccineTemplateReducer]);

  const getdata = async () => {
    dispatch(getVaccineTemplateList());
  };

  const handleAddButton = () => {
    navigate(`/${params.roleName}/create/vaccine-template`);
  };

  const handleActions = (data, actionType) => {
    if (actionType === "EDIT") {
      // navigate(`/${params.roleName}/edit/${params.userRole}/${data.id}`);
    } else if (actionType === "VIEW") {
      // navigate(`/${params.roleName}/view/${params.userRole}/${data.id}`);
    } else if (actionType === "DELETE") {
      setSelectedUserId(data.id); // Set the selected user ID
      onOpen();
    }
    // Handle more action here
  };

  const handleConfirm = () => {
    if (selectedUserId) {
      dispatch(deleteVaccineTemplate(selectedUserId));
      console.log("Confirmed!");
      onClose();
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {vaccineTemplates.length > 0 ? (
          <AppTable
            columnsData={columns}
            tableData={vaccineTemplates}
            isAddButton={true}
            handleAddButton={handleAddButton}
            showAction={true}
            onDelete={handleActions}
          />
        ) : (
          <AppLoader />
        )}
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure want to delete this vaccine ?."
          body="Are you sure? You can't undo this action afterwards."
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
        />
      </SimpleGrid>
    </Box>
  );
}
