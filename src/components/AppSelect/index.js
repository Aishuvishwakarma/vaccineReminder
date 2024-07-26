import React from "react";
import {
  FormLabel,
  Select,
  Text,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { extraOptions } from "./constant";

const AppSelect = ({
  name,
  value,
  onChange,
  onBlur,
  invalid,
  error,
  disabled,
  handleChange,
  isRequired = true,
  fontSize = "sm",
  placeholder = "",
  label = "",
  styles = {},
  size = "lg",
  options = [],
  isExternal = false,
}) => {
  const textColor = useColorModeValue("navy.700", "white");

  const renderOptions = () => {
    const fieldname = name.split(".")[1]
    if (isExternal) {
      if (extraOptions[fieldname]) {
        return extraOptions[fieldname].map((option, key) => (
          <option value={option.value} key={key}>
            {option.label}
          </option>
        ));
      } else {
        console.warn(`No options found for external select with name: ${name}`);
        return null;
      }
    } else {
      return options.map((option, key) => (
        <option value={option.value} key={key}>
          {option.label}
        </option>
      ));
    }
  };

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      {label && (
        <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
          {label}
        </FormLabel>
      )}
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={disabled}
        placeholder={placeholder}
        sx={{ ...styles, borderRadius: "7px" }}
        fontSize={fontSize}
        variant="auth"
        size={size}
        mb="8px"
        errorBorderColor="crimson"
      >
        {renderOptions()}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AppSelect;
