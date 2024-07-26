import React, { useState, useEffect } from "react";
import AppTableForm from "../../components/AppTableForm"; // Adjust the path based on your file structure
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRolesUser,
  userRoles as getUserRoles,
} from "../../store/userRoles/roleAction";
import {
  resetPermissions,
  getPermissions,
  updatePermission,
} from "../../store/permissions/permissionsAction";
import { resetModules, getModules } from "../../store/modules/modulesAction";
import { useNavigate, useParams } from "react-router-dom";

function Permissions(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState([]);
  const [roleId, setRoleId] = useState("");

  const { loggedInUser, userPermissions, modules, userRoles } = useSelector(
    (state) => {
      return {
        userRoles: state.roleReducer.roles,
        loggedInUser: state.authReducer.user,
        modules: state.modulesReducer.modules,
        userPermissions: state.permissionsReducer.permissions,
      };
    }
  );

  const userPermissionsAccess =
    Array.isArray(loggedInUser.permissions) &&
    loggedInUser.permissions.length > 0
      ? loggedInUser.permissions
      : [];

  const userPermissionsRouteAccess = userPermissionsAccess.find(
    (permission) => permission?.module_name === "user permissions"
  );

  useEffect(() => {
    dispatch(getUserRoles());
    dispatch(getModules());
    dispatch(getPermissions());
    return () => {
      dispatch(resetRolesUser());
      dispatch(resetModules());
      dispatch(resetPermissions());
    };
  }, [dispatch]);

  useEffect(() => {
    if (modules && Array.isArray(modules)) {
      setPermissions(
        modules
          .map((permissionModule) => ({
            module_name: permissionModule?.module_name,
            module_id: permissionModule.id,
            create_permission: false,
            delete_permission: false,
            update_permission: false,
            read_permission: false,
          }))
          .filter(
            (module) =>
              module.module_name.toLowerCase() !==
                params?.roleName?.toLowerCase() &&
              module.module_name.toLowerCase() !== "superadmin"
          )
      );
    }
  }, [modules]);

  useEffect(() => {
    if (
      params?.roleName?.toLowerCase() !== "superadmin" &&
      userPermissionsRouteAccess &&
      !userPermissionsRouteAccess.create_permission
    ) {
      console.log(`/${params?.roleName}/dashboard`)
      navigate(`/${params?.roleName}/dashboard`);
    }
  }, [userPermissionsRouteAccess]);

  const handleCheckboxChange = (index, field, value) => {
    const newPermissions = [...permissions];
    newPermissions[index][field] = value;
    setPermissions(newPermissions);
  };

  const handleSubmit = () => {
    const formattedPermissions = permissions.map((module) => ({
      ...module,
      create_permission: Number(module.create_permission),
      delete_permission: Number(module.delete_permission),
      update_permission: Number(module.update_permission),
      read_permission: Number(module.read_permission),
    }));
    const obj = {
      user_role_id: roleId,
      dataArr: formattedPermissions,
    };
    console.log("Submitted Permissions:", obj);
    dispatch(updatePermission(obj));
    // Handle the form submission as needed
  };

  const moduleData = permissions.map((module, index) => ({
    ...module,
    onChange: (field, value) => handleCheckboxChange(index, field, value),
  }));

  const dropdownOptions =
    userRoles &&
    Array.isArray(userRoles) &&
    userRoles
      .map((userRole) => ({
        value: userRole.id,
        label: userRole.role_name,
      }))
      .filter((role) => role.label !== loggedInUser?.role_name);

  const handleDropdownChange = (event) => {
    const selectedRoleId = event.target.value;
    setRoleId(selectedRoleId);

    const filteredPermissions = userPermissions
      .filter(
        (permission) => permission.user_role_id === Number(selectedRoleId)
      )
      .map((permission) => ({
        module_name: permission.module_name,
        module_id: permission.module_id,
        create_permission: Boolean(permission.create_permission),
        delete_permission: Boolean(permission.delete_permission),
        update_permission: Boolean(permission.update_permission),
        read_permission: Boolean(permission.read_permission),
      }));

    setPermissions((prevPermissions) =>
      prevPermissions.map((module) => {
        const matchingPermission = filteredPermissions.find(
          (perm) => perm.module_id === module.module_id
        );
        return matchingPermission ? matchingPermission : module;
      })
    );
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <AppTableForm
          columns={["Module", "Create", "Delete", "Update", "Read"]}
          modules={moduleData}
          onSubmit={handleSubmit}
          tableTitle="Manage Permissions"
          dropdownOptions={dropdownOptions}
          onDropdownChange={handleDropdownChange}
        />
      </SimpleGrid>
    </Box>
  );
}

export default Permissions;
