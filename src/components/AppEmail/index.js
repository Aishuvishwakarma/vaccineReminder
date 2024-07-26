import React from "react";
import {
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const AppEmail = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  invalid,
  error,
  disabled,
  isRequired = true,
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      {label && (
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          {label}
        </FormLabel>
      )}
      <Input
        type='email'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={disabled}
        errorBorderColor="crimson"
      />
      {<FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default AppEmail;
