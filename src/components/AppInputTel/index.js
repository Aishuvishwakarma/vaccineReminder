import React from "react";
import {
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  Stack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const AppInputTel = ({
  value,
  invalid,
  error,
  isRequired = true,
  fontSize = "sm",
  placeholder = "",
  name = "",
  label = "",
  size = "lg",
  onChange,
  onBlur,
  disabled,
  countryCode = "+91",
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

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
          {isRequired && <Text color={brandStars}>*</Text>}
        </FormLabel>
      )}
      <Stack spacing={4}>
        <InputGroup size={size}>
          <InputLeftAddon>{countryCode}</InputLeftAddon>
          <Input
            fontSize={fontSize}
            type='tel'
            placeholder={placeholder}
            mb="24px"
            fontWeight="500"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            isDisabled={disabled}
          />
        </InputGroup>
      </Stack>
      {invalid && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default AppInputTel;
