import React from "react";
import { FormLabel, Input, Text, useColorModeValue, FormControl, FormErrorMessage } from "@chakra-ui/react";

const AppInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  invalid,
  error,
  disabled,
  fieldType = "text",
  isRequired = true,
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      {label && (
        <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
          {label}
        </FormLabel>
      )}
      <Input
        type={fieldType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={disabled}
        errorBorderColor="crimson"
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AppInput;
