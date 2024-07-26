import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import AppTable from "../../components/AppTable";
import AppLoader from "../../components/AppLoader";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/AppDialog";
import { useDispatch, useSelector } from "react-redux";
import {
//   getUserList,
//   resetUserDetail,
//   deleteUser,
} from "../../store/userConfigure/userAction";

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
    Header: "MOBILE NUMBER",
    accessor: "mobile_number",
    label: "Mobile Number",
  },
  {
    Header: "STATUS",
    accessor: "status",
    label: "Status",
  },
];

function EventList() {
  const [dynamicList, setDynamicList] = useState([]);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams(); // Assuming you'll need this for some operation

//   const { userList } = useSelector((state) => state.userConfigure); // Adjust based on your Redux state

  useEffect(() => {
    // dispatch(getUserList());
  }, [dispatch]);

//   useEffect(() => {
//     if (userList) {
//       setDynamicList(userList);
//       setLoader(false);
//     }
//   }, [userList]);

  const handleActions = (row, action) => {
    switch (action) {
      case "VIEW":
        navigate(`/user/view/${row.id}`);
        break;
      case "EDIT":
        navigate(`/user/edit/${row.id}`);
        break;
      case "DELETE":
        onOpen();
        break;
      default:
        break;
    }
  };

  const handleConfirm = () => {
    // dispatch(deleteUser(id));
    onClose();
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        work in progress..
        {/* {Array.isArray(dynamicList) && dynamicList.length > 0 && !loader ? (
          <AppTable
            columnsData={columns}
            tableData={dynamicList}
            onView={handleActions}
            onEdit={handleActions}
            onDelete={handleActions}
            showAction={true}
          />
        ) : (
          <AppLoader />
        )}
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure want to delete this user?"
          body="Are you sure? You can't undo this action afterwards."
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
        /> */}
      </SimpleGrid>
    </Box>
  );
}

export default EventList;
