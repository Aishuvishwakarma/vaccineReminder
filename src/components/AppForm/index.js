import React from "react";
import {
  Button,
  Flex,
  Box,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Card from "../card/Card";
import { renderInputs } from "./fields";
import { createValidationSchema } from "./validation";
import { useNavigate } from "react-router-dom";

function AppForm({
  formFields = [],
  initialValues = {},
  handleFormSubmit,
  formTitle = "",
  showCancel = false,
  formType = "normal",
  backButton = false,
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const validationSchema = createValidationSchema(formFields);
  const navigate = useNavigate();

  return (
    <Box pt={{ base: "20px", md: "30px", xl: "40px" }}>
      <Card w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            textTransform="capitalize"
          >
            {formTitle}
          </Text>
          {backButton && (
            <Button
              type="submit"
              h="44px"
              mb="10px"
              variant="setup"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          )}
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleFormSubmit(values, actions);
          }}
        >
          {(formik) => (
            <Form>
              {formType === "normal" && (
                <Grid
                  // templateColumns={{
                  //   base: "repeat(1, 1fr)",
                  //   sm: "repeat(2, 1fr)",
                  //   lg: "repeat(3, 1fr)",
                  // }}
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  columnGap={2}
                  px="25px"
                >
                  {formFields.map((field, index) => (
                    <GridItem
                      colSpan={field?.colSpan ? field?.rowSpan : 1}
                      rowSpan={field?.rowSpan ? field?.rowSpan : 1}
                      key={index}
                    >
                      {renderInputs(field, formik)}
                    </GridItem>
                  ))}
                </Grid>
              )}

              {formType === "collapsible" &&
                formFields.map((field, index) => {
                  return (
                    <Box
                      px="25px"
                      templateRows={"repeat(1, 1fr)"}
                      templateColumns={"repeat(1, 1fr)"}
                      rowGap={2}
                    >
                      <Box
                        key={index}
                        // colSpan={field?.colSpan ? field?.colSpan : 1}
                        // rowSpan={field?.rowSpan ? field?.rowSpan : 1}
                      ></Box>
                      {renderInputs(field, formik)}
                    </Box>
                  );
                })}

              <Flex px="25px" justify="flex-end" mb="20px" align="center">
                {showCancel && (
                  <Button
                    h="44px"
                    me="2"
                    mb="10px"
                    variant="brand"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" h="44px" mb="10px" variant="setup">
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

export default AppForm;
