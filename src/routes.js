import React from "react";
import { Navigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdVaccines,
  MdPersonAdd,
  MdAdminPanelSettings,
  MdPrivacyTip,
} from "react-icons/md";

import { IconConstantType } from "./constants/iconConstant";
import { FaHospitalUser, FaUsersCog } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
// Admin Imports
// import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
// import DataTables from "./views/admin/dataTables";
import RTL from "./views/admin/rtl";
import ExampleButton from "./pages/ExampleButton";

// Auth Imports
// import SignInCentered from "./views/auth/signIn";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import VaccineTemplates from "./pages/VaccineManagement/VaccineTemplates";
import CreateVaccineTemplates from "./pages/VaccineManagement/CreateVaccineTemplates";
import AdminList from "./pages/AdminManagement/AdminList";
import UserList from "./pages/UsersManagement/UserList";
import CreateUser from "./pages/UsersManagement/CreateUser";
import EditUser from "./pages/UsersManagement/EditUser";
import ViewUser from "./pages/UsersManagement/ViewUser";
import DoctorList from "./pages/DoctorManagement/DoctorList";
import StaffList from "./pages/StaffManagement/StaffList";
import Permissions from "./pages/PermissionsManagement/Permissions";
import NotificationList from "./pages/NotificationsManagement/NotificationList";
import EventList from "./pages/EventManagement/EventList";
import CreateEvent from "./pages/EventManagement/CreateEvent";

import Home from "./views/Landing";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: (
      <Icon
        as={IconConstantType.MD_DASHBOARD}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },
  {
    name: "Vaccine Templates List",
    layout: "/admin",
    path: "/vaccine-template/list",
    icon: (
      <Icon
        as={IconConstantType.MD_VACCINES}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },
  {
    name: "Admin List",
    layout: "/admin",
    path: "/user-list",
    icon: (
      <Icon
        as={IconConstantType.FA_USERS_COG}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },
  {
    name: "Create User",
    layout: "/admin",
    path: "/create-users",
    icon: (
      <Icon
        as={IconConstantType.MD_PERSON_ADD}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },
  // {
  //   name: "Create Doctors",
  //   layout: "/admin",
  //   path: "/create-doctors",
  //   icon: <Icon as={MdLocalHospital} width="20px" height="20px" color="inherit" />,
  // },
];

const getLayout = (roleName, loggedInUser, permissions) => {
  console.log(permissions);

  const userPermissions = permissions.find(
    (permission) => permission?.module_name === "user permissions"
  );
  const staffPermissions = permissions.find(
    (permission) => permission?.module_name === "staff"
  );
  const doctorPermissions = permissions.find(
    (permission) => permission?.module_name === "doctor"
  );
  const commonRoutes = [
    {
      name: "Dashboard",
      layout: `/${roleName}`,
      path: "/dashboard",
      icon: (
        <Icon
          as={IconConstantType.MD_DASHBOARD}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
    {
      name: "Vaccine Templates List",
      layout: `/${roleName}`,
      path: "/vaccine-template/list",
      icon: (
        <Icon
          as={IconConstantType.MD_VACCINES}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
  ];

  const superAdminRoutes = [
    {
      name: "Users Management",
      icon: (
        <Icon
          as={IconConstantType.FA_USERS_COG}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      children: [
        {
          name: "Admin List",
          layout: `/${roleName}`,
          path: "/admin/list",
          icon: (
            <Icon
              as={IconConstantType.MD_ADMIN_PANEL_SETTINGS}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
        {
          name: "Doctor List",
          layout: `/${roleName}`,
          path: "/doctor/list",
          icon: (
            <Icon
              as={IconConstantType.FA_USER_DOCTOR}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
        {
          name: "Staff List",
          layout: `/${roleName}`,
          path: "/staff/list",
          icon: (
            <Icon
              as={IconConstantType.FA_HOSPITAL_USER}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
        {
          name: "Create User",
          layout: `/${roleName}`,
          path: "/create-users",
          icon: (
            <Icon
              as={IconConstantType.MD_PERSON_ADD}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
      ],
    },
    {
      name: "User Permissions",
      layout: `/${roleName}`,
      path: "/permissions",
      icon: (
        <Icon
          as={IconConstantType.MD_PRIVACY_TIP}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
    {
      name: "Events",
      icon: (
        <Icon
          as={IconConstantType.MD_EVENT_REPEAT}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      children: [
        {
          name: "Event List",
          layout: `/${roleName}`,
          path: "/events/list",
          icon: (
            <Icon
              as={IconConstantType.Md_Outline_Event}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
        {
          name: "Create Event",
          layout: `/${roleName}`,
          path: "/create-event",
          icon: (
            <Icon
              as={IconConstantType.MD_Outline_Event_Available}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
      ],
    },
    {
      name: "Notifications",
      layout: `/${roleName}`,
      path: "/notifications",
      icon: (
        <Icon
          as={IconConstantType.MD_NOTIFICATIONS_ADD}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
    // {
    //   name: "NFT Marketplace",
    //   layout: "/admin",
    //   path: "/nft-marketplace",
    //   icon: (
    //     <Icon
    //       as={IconConstantType.MdMenu}
    //       width="20px"
    //       height="20px"
    //       color="inherit"
    //     />
    //   ),
    //   secondary: true,
    // },
    // {
    //   name: "RTL Admin",
    //   layout: "/rtl",
    //   path: "/rtl-default",
    //   icon: (
    //     <Icon
    //       as={IconConstantType.MdMenu}
    //       width="20px"
    //       height="20px"
    //       color="inherit"
    //     />
    //   ),
    // },
    {
      name: "ExampleButton",
      layout: `/${roleName}`,
      path: "/example/button",
      icon: (
        <Icon
          as={IconConstantType.IoIosRadioButtonOn}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
  ];

  const adminRoutes = [
    {
      name: "Users Management",
      icon: (
        <Icon
          as={IconConstantType.FA_USERS_COG}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      children: [
        ...(doctorPermissions && doctorPermissions?.read_permission
          ? [
              {
                name: "Doctor List",
                layout: `/${roleName}`,
                path: "/doctor/list",
                icon: (
                  <Icon
                    as={IconConstantType.FA_USER_DOCTOR}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                ),
              },
            ]
          : []),
        ...(staffPermissions && staffPermissions?.read_permission
          ? [
              {
                name: "Staff List",
                layout: `/${roleName}`,
                path: "/staff/list",
                icon: (
                  <Icon
                    as={IconConstantType.FA_HOSPITAL_USER}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                ),
              },
            ]
          : []),
        {
          name: "Create User",
          layout: `/${roleName}`,
          path: "/create-users",
          icon: (
            <Icon
              as={IconConstantType.MD_PERSON_ADD}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
        },
      ],
    },
    ...(userPermissions && userPermissions?.create_permission
      ? [
          {
            name: "User Permissions",
            layout: `/${roleName}`,
            path: "/permissions",
            icon: (
              <Icon
                as={IconConstantType.MD_PRIVACY_TIP}
                width="20px"
                height="20px"
                color="inherit"
              />
            ),
          },
        ]
      : []),
    {
      name: "Events",
      layout: `/${roleName}`,
      path: "/events/list",
      icon: (
        <Icon
          as={IconConstantType.MD_NOTIFICATIONS_ADD}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
    },
  ];

  const doctorRoutes = [
    {
      name: "Users Management",
      icon: (
        <Icon
          as={IconConstantType.FA_USERS_COG}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      children: [
        ...(staffPermissions && staffPermissions?.read_permission
          ? [
              {
                name: "Staff List",
                layout: `/${roleName}`,
                path: "/staff/list",
                icon: (
                  <Icon
                    as={IconConstantType.FA_HOSPITAL_USER}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                ),
              },
            ]
          : []),
        // {
        //   name: "Create User",
        //   layout: `/${roleName}`,
        //   path: "/create-users",
        //   icon: (
        //     <Icon
        //       as={IconConstantType.MD_PERSON_ADD}
        //       width="20px"
        //       height="20px"
        //       color="inherit"
        //     />
        //   ),
        // },
      ],
    },
    ...(userPermissions && userPermissions?.create_permission
      ? [
          {
            name: "User Permissions",
            layout: `/${roleName}`,
            path: "/permissions",
            icon: (
              <Icon
                as={IconConstantType.MD_PRIVACY_TIP}
                width="20px"
                height="20px"
                color="inherit"
              />
            ),
          },
        ]
      : []),
  ];

  return [
    ...commonRoutes,
    ...(roleName === "Superadmin" ? superAdminRoutes : []),
    ...(roleName === "Admin" ? adminRoutes : []),
    ...(roleName === "doctor" ? doctorRoutes : []),
  ];
};

const Authmiddleware = (props) => {
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate
        to={{ pathname: "/auth/sign-in", state: { from: props.location } }}
      />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

const NonAuthLayout = (props) => {
  const authRole = localStorage.getItem("authRole");
  if (
    localStorage.getItem("authUser") &&
    authRole &&
    "/logout" !== window.location.pathname
  ) {
    return (
      <Navigate
        to={{
          pathname: `/${authRole}/dashboard`,
          state: { from: props.location },
        }}
      />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

const authProtectedRoutes = [
  {
    path: "/:roleName/dashboard",
    component: <AdminDashboard />,
  },
  {
    path: "/:roleName/vaccine-template/list",
    component: <VaccineTemplates />,
  },
  {
    path: "/:roleName/create/vaccine-template",
    component: <CreateVaccineTemplates />,
  },
  {
    path: "/:roleName/edit/:userType/:userId",
    component: <EditUser />,
  },
  {
    path: "/:roleName/view/:userType/:userId",
    component: <ViewUser />,
  },
  {
    path: "/:roleName/create-users",
    component: <CreateUser />,
  },
  {
    path: "/:roleName/:userRole/list",
    component: <UserList />,
  },
  {
    path: "/:roleName/permissions",
    component: <Permissions />,
  },
  {
    path: "/:roleName/notifications",
    component: <NotificationList />,
  },
  {
    path: "/:roleName/events/list",
    component: <EventList />,
  },
  {
    path: "/:roleName/create-event",
    component: <CreateEvent />,
  },
  {
    path: "/:roleName/nft-marketplace",
    component: <NFTMarketplace />,
  },
  {
    path: "/:roleName/profile",
    component: <Profile />,
  },
  {
    path: "/rtl/rtl-default",
    component: <RTL />,
  },
  {
    path: "/:roleName/example/button",
    component: <ExampleButton />,
  },
];

const publicRoutes = [
  { path: "/auth/sign-in", component: <Login /> },
  { path: "/", component: <Home /> },
];

export {
  Authmiddleware,
  NonAuthLayout,
  publicRoutes,
  authProtectedRoutes,
  routes,
  getLayout,
};

// export default routes;
