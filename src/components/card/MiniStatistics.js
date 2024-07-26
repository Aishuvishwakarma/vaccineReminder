// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Default(props) {
  const { startContent, endContent, name, growth, value, roleName } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray";
  const navigate = useNavigate();

  const onClickCount = () => {
    const formattedName = name.replace(/\s+/g, "-");
    name !== "patient" && navigate(`/${roleName}/${formattedName}/list`);
  };

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
            textTransform={"capitalize"}
          >
            {name}
          </StatLabel>
          <Box onClick={onClickCount}cursor={'pointer'} >
            <StatNumber
              color={textColor}
              fontSize={{
                base: "2xl",
              }}
            >
              {value}
            </StatNumber>
          </Box>
          {growth ? (
            <Flex align="center">
              <Text color="green.500" fontSize="xs" fontWeight="700" me="5px">
                {growth}
              </Text>
              <Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
