import React from "react";
import { Box, IconButton, Grid, GridItem } from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { renderInputs } from "./fields";

const AppMultiFieldsFields = ({
  name,
  fields,
  formik,
  templateColumns = "repeat(3, 1fr)",
  parentIndex = 0
}) => {
  const { values, setFieldValue } = useFormikContext();
  const fieldValues = values[name] || [];

  const addFieldSet = () => {
    const newFieldSet = fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: "" }),
      {}
    );
    setFieldValue(name, [...fieldValues, newFieldSet]);
  };

  return (
    <FieldArray name={name}>
      {({ remove }) => (
        <Box>
          {fieldValues.map((_, index) => (
            <Box
              key={index}
              position={"relative"}
              mb={"10px"}
              backgroundColor={"#FAF5FF"}
              sx={{ border: "1px solid #E6ECFA", borderRadius: "10px" }}
              paddingX={"40px"}
              paddingY={"20px"}
            >
              <Grid
                key={index}
                templateColumns={templateColumns}
                columnGap={2}
                rowGap={2}
              >
                {fields.map((field, fieldIndex) =>
                  renderInputs(
                    { ...field, name: `${name}[${index}].${field.name}` },
                    formik,
                    index
                  )
                )}
              </Grid>
              <Box
                position="absolute"
                display={"flex"}
                flexDirection={"column"}
                right={0}
                top={"50%"}
                transform={"translate(50%,-50%)"}
                colSpan={1}
              >
                <IconButton
                  aria-label="Add Field"
                  icon={<AddIcon />}
                  colorScheme="blue"
                  onClick={addFieldSet}
                />
                {index > 0 && (
                  <IconButton
                    aria-label="Remove field"
                    icon={<MinusIcon />}
                    onClick={() => remove(index)}
                    colorScheme="red"
                    mt={4}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </FieldArray>
  );
};

export default AppMultiFieldsFields;
