import React from "react";
import {
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

function FormTable({
  modules,
  onSubmit,
  tableTitle,
  dropdownOptions,
  onDropdownChange,
  columns = [],
}) {
  const textColor = useColorModeValue("gray.700", "white");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const rowHoverColor = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const renderCheckbox = (module, permissionType) => (
    <Td borderColor={borderColor}>
      <Checkbox
        colorScheme="blue"
        isChecked={module[permissionType]}
        onChange={(e) => module.onChange(permissionType, e.target.checked)}
      />
    </Td>
  );

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" align="center" mb="20px">
        <Text
          color={textColor}
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="short"
        >
          {tableTitle}
        </Text>
        <Select
          placeholder="Select User Roles"
          onChange={onDropdownChange}
          bg={useColorModeValue("white", "gray.800")}
          borderColor={borderColor}
          color={textColor}
          maxW="200px"
        >
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="gray" mb="24px">
          <Thead bg={headerBgColor}>
            <Tr>
              {columns.map((column, index) => (
                <Th key={index} color={textColor} borderColor={borderColor}>
                  {column}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {modules.map((module, index) => (
              <Tr
                key={index}
                _hover={{ bg: rowHoverColor }}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <Td color={textColor} borderColor={borderColor}>
                  {module.module_name}
                </Td>
                {renderCheckbox(module, "create_permission")}
                {renderCheckbox(module, "delete_permission")}
                {renderCheckbox(module, "update_permission")}
                {renderCheckbox(module, "read_permission")}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex px="25px" justify="flex-end" mb="20px">
        <Button mt={4} colorScheme="blue" onClick={onSubmit}>
          Submit
        </Button>
      </Flex>
    </Card>
  );
}

export default FormTable;
