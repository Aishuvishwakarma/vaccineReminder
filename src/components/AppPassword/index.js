import React, { useState } from "react";
import {
  FormLabel,
  Button,
  InputRightElement,
  Input,
  Text,
  useColorModeValue,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const AppPassword = ({
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
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
      <InputGroup size={size}>
        <Input
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder || "Enter password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isDisabled={disabled}
          errorBorderColor="crimson"
          pr="4.5rem"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {invalid && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default AppPassword;
