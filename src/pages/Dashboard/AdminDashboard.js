import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "../../components/card/MiniStatistics";
import IconBox from "../../components/icons/IconBox";
import { IconConstantType } from "../../constants/iconConstant";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdBarChart } from "react-icons/md";
import { getDashboard } from "../../helpers/api/dashboardApi";
// import { getMyPermissions } from "../../store/permissions/permissionsAction";
import AppLoader from "../../components/AppLoader";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  // Chakra Color Mode
  const [dashboard, setdashboard] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const params = useParams();
  // const dispatch = useDispatch();
  const { loggedInUser, myPermissions } = useSelector((state) => {
    return {
      loggedInUser: state.authReducer.user,
      // myPermissions: state.permissionsReducer.myPermissions,
    };
  });

  useEffect(() => {
    if (loggedInUser) {
      // params.roleName !== "Superadmin" && dispatch(getMyPermissions());
      getDashboard(loggedInUser.id).then((res) => {
        setdashboard(res.response_data);
      });
    }
  }, [loggedInUser]);

  const handleIcon = (propertyName) => {
    switch (propertyName) {
      case "admin":
        return IconConstantType.MD_ADMIN_PANEL_SETTINGS;
      case "doctor":
        return IconConstantType.FA_USER_DOCTOR;
      case "staff":
        return IconConstantType.FA_HOSPITAL_USER;
      case "patient":
        return IconConstantType.FA_HOSPITAL_USER;
      case "vaccine template":
        return IconConstantType.MD_VACCINES;
      default:
        return IconConstantType.MD_DASHBOARD;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {Array.isArray(dashboard) && dashboard.length > 0 ? (
          dashboard
            .filter(
              (dash) => dash?.property_name !== params.roleName.toLowerCase()
            )
            .map((dash, key) => (
              <MiniStatistics
                key={key}
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={handleIcon(dash?.property_name)}
                        color={brandColor}
                      />
                    }
                  />
                }
                name={dash?.property_name}
                value={dash?.role_count}
                roleName={params.roleName}
              />
            ))
        ) : (
          <AppLoader />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default UserDashboard;
