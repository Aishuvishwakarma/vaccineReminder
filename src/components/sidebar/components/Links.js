import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Collapse,
  Button,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function SidebarLinks(props) {
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes, sidebarVisibility } = props;

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <CollapsibleLink
            key={index}
            route={route}
            sidebarVisibility={sidebarVisibility}
          />
        );
      } else {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    {!sidebarVisibility && (
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    )}
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };

  const CollapsibleLink = ({ route, sidebarVisibility }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      if (route.children) {
        const anyChildActive = route.children.some((child) =>
          activeRoute(child.path.toLowerCase())
        );
        setIsOpen(anyChildActive);
      }
    }, [location, route.children]);

    const anyChildActive = route.children
      ? route.children.some((child) => activeRoute(child.path.toLowerCase()))
      : false;
    console.log(route.children);
    return (
      <>
        {!sidebarVisibility ? (
          <Button
            onClick={toggleCollapse}
            variant="ghost"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            color={anyChildActive ? activeIcon : textColor}
            fontWeight={anyChildActive ? "bold" : "normal"}
          >
            <Flex align="center">
              {route.icon && (
                <Box me="12px" color={anyChildActive ? activeIcon : textColor}>
                  {route.icon}
                </Box>
              )}
              <Text color={anyChildActive ? activeColor : inactiveColor}>
                {route.name}
              </Text>
            </Flex>
            {isOpen ? (
              <ChevronUpIcon color={anyChildActive ? activeColor : textColor} />
            ) : (
              <ChevronDownIcon
                color={anyChildActive ? activeColor : textColor}
              />
            )}
          </Button>
        ) : (
          <Flex w="100%" alignItems="center" direction={'column'} justifyContent="center">
            {route.icon && (
              <Box
                onClick={toggleCollapse}
                color={anyChildActive ? activeIcon : textColor}
              >
                {route.icon}
              </Box>
            )}
            {/* <Flex w="100%" direction={'column'} alignItems="center" justifyContent="center">
              {route.children &&
                route.children.map((routrChild, key) => (
                  <Box
                    onClick={toggleCollapse}
                    color={anyChildActive ? activeIcon : textColor}
                    key={key}
                  >
                    {routrChild.icon}
                  </Box>
                ))}
            </Flex> */}
          </Flex>
        )}
        <Collapse in={isOpen} animateOpacity>
          <Box pl="20px">{route.children && createLinks(route.children)}</Box>
        </Collapse>
      </>
    );
  };

  return createLinks(routes);
}

export default SidebarLinks;
