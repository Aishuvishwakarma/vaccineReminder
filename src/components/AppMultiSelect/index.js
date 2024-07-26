import React from "react";
import Select from "react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const AppMultiSelect = ({ name, label, placeholder, value, onChange, onBlur, invalid, error, options=[] }) => {
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions ? selectedOptions.map(option => option.value) : []
      }
    });
  };

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        name={name}
        placeholder={placeholder}
        // value={options && options.filter(option => value.includes(option?.value))}
        onChange={handleChange}
        onBlur={onBlur}
        options={options}
        isMulti
        mb="8px"
      />
      {invalid && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default AppMultiSelect;
