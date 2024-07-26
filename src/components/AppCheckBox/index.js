import React from 'react';
import {
  FormLabel,
  Checkbox,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const AppCheckBox = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  invalid,
  error,
  isRequired = false,
  isDisabled = false,
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const errorColor = useColorModeValue("crimson", "pink.500");

  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(name, checked);
  };

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      <Checkbox
        name={name}
        isChecked={value}
        onChange={handleChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
        colorScheme="brand" // Adjust color scheme as needed
        height="44px" // Set the height to match input fields
        alignItems="center" // Align checkbox vertically centered with label
      >
        <FormLabel color={textColor} mb="0">
          {label}
        </FormLabel>
      </Checkbox>
      <FormErrorMessage color={errorColor}>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AppCheckBox;
