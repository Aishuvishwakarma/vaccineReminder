// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { getLayout } from "../../routes";
import { getMyPermissions } from "../../store/permissions/permissionsAction";

import { AppContext } from "../../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";

// Custom Chakra theme
export default function DashboardLayout(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const { fetchUserData, loggedInUser } = useContext(AppContext);
  const dispatch = useDispatch();

  const {  myPermissions } = useSelector((state) => {
    return {
      // userPermissions: state.authReducer?.user?.permissions,
      myPermissions: state.permissionsReducer.myPermissions,
    };
  });

  const authUser = localStorage.getItem("authUser");

  useEffect(() => {
    if (loggedInUser?.role_name && loggedInUser.role_name !== "Superadmin") {
      dispatch(getMyPermissions());
    }
  }, [loggedInUser?.role_name]);

  useEffect(() => {
    if (typeof authUser === "string") {
      const user = JSON.parse(authUser);
      user && fetchUserData(JSON.parse(user?.id));
    }
  }, [authUser]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (
        ["/Admin", "/Superadmin", "/Doctor", "/Staff"].includes(prop.layout)
      ) {
        return (
          <Route
            path={prop.layout + prop.path}
            element={prop.element}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";

  // console.log(userPermissions, "loggedInUser", myPermissions);

  const renderAdminLayout =
    loggedInUser &&
    getLayout(loggedInUser?.role_name, loggedInUser, myPermissions);
  return (
    <Box>
      {loggedInUser && (
        <Box>
          <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
            <Sidebar
              routes={renderAdminLayout}
              sidebarVisibility={sidebarVisibility}
              setSidebarVisibility={setSidebarVisibility}
              display="none"
              {...rest}
            />
            <Box
              float="right"
              minHeight="100vh"
              height="100%"
              overflow="auto"
              position="relative"
              maxHeight="100%"
              w={{
                base: "100%",
                xl: sidebarVisibility
                  ? "calc( 100% - 90px )"
                  : "calc( 100% - 290px )",
              }}
              maxWidth={{
                base: "100%",
                xl: sidebarVisibility
                  ? "calc( 100% - 90px )"
                  : "calc( 100% - 290px )",
              }}
              transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
              transitionDuration=".2s, .2s, .35s"
              transitionProperty="top, bottom, width"
              transitionTimingFunction="linear, linear, ease"
            >
              <Portal>
                <Box>
                  <Navbar
                    onOpen={onOpen}
                    logoText={"Vaccine Reminders"}
                    brandText={getActiveRoute(renderAdminLayout)}
                    secondary={getActiveNavbar(renderAdminLayout)}
                    message={getActiveNavbarText(renderAdminLayout)}
                    fixed={fixed}
                    {...rest}
                    loggedInUser={loggedInUser}
                    sidebarVisibility={sidebarVisibility}
                  />
                </Box>
              </Portal>
              <Box
                mx="auto"
                p={{ base: "20px", md: "30px" }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                {rest.children}
              </Box>
              <Box>
                <Footer />
              </Box>
            </Box>
          </SidebarContext.Provider>
        </Box>
      )}
    </Box>
  );
}
