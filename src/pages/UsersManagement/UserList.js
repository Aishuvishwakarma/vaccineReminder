import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import AppTable from "../../components/AppTable";
import AppLoader from "../../components/AppLoader";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/AppDialog";
import {
  getUserList,
  resetUserDetail,
  deleteUser,
} from "../../store/userConfigure/userAction";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    Header: "NAME",
    accessor: "name",
    label: "NAME",
  },
  {
    Header: "EMAIL",
    accessor: "email",
    label: "Email",
  },
  {
    Header: "DEFAULT",
    accessor: "mobile_number",
    label: "Mobile Number",
  },
  {
    Header: "STATUS",
    accessor: "status",
    label: "Status",
  },
];

export default function UserList() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { dynamicList, loader } = useSelector((state) => {
    return {
      dynamicList: state.configUserReducer.dynamicList,
      loggedInUser: state.authReducer.user,
      loader: state.configUserReducer.loader,
    };
  });

  useEffect(() => {
    console.log(params)
    dispatch(getUserList(params?.userRole,params?.roleName));
//     if(params?.roleName==="Superadmin") {
//     }else if(params?.roleName==="Admin"){
// // getAllUserApi
//     }
    return () => {
      console.log("Resetting user details");
      dispatch(resetUserDetail());
    };
  }, [dispatch, params?.userRole]);
  
  const handleActions = (data, actionType) => {
    if (actionType === "EDIT") {
      navigate(`/${params.roleName}/edit/${params.userRole}/${data.id}`);
    } else if (actionType === "VIEW") {
      navigate(`/${params.roleName}/view/${params.userRole}/${data.id}`);
    } else if (actionType === "DELETE") {
      setSelectedUserId(data.id); // Set the selected user ID
      onOpen();
    }
    // Handle more action here
  };

  const handleConfirm = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId,params?.userRole)); // Dispatch the deleteUser action
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
        {Array.isArray(dynamicList) && dynamicList.length > 0 && !loader ? (
          <AppTable
            columnsData={columns}
            tableData={dynamicList}
            onView={handleActions}
            onEdit={handleActions}
            onDelete={handleActions}
            // onMore={handleMore}
            showAction={true}
          />
        ) : (
          <AppLoader />
        )}
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure want to delete this user ?."
          body="Are you sure? You can't undo this action afterwards."
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
        />
      </SimpleGrid>
    </Box>
  );
}
