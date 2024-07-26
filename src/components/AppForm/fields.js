import React from "react";
import AppInput from "../AppInput";
import AppSelect from "../AppSelect";
import AppInputTel from "../AppInputTel";
import AppPassword from "../AppPassword";
import AppDate from "../AppDate";
import AppEmail from "../AppEmail";
import AppMultiSelect from "../AppMultiSelect";
import AppMultiFieldsFields from "./AppMultiFieldsFields";
import AppCheckBox from "../AppCheckBox";
import { Grid, GridItem, Box } from "@chakra-ui/react";

export const renderInputs = (field, formik, parentIndex = 0) => {
  const commonProps = {
    name: field.name,
    label: field.label,
    placeholder: field.placeholder,
    value: formik.values[field.name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    invalid: formik.touched[field.name] && formik.errors[field.name],
    error: formik.errors[field.name],
    isExternal: field.isExternal
  };

  const renderConditionFields = (field, formik, parentIndex = 0) => {
    if (field.isCondition && field.shoWhen) {
      const values = formik.values.vaccineDetails[parentIndex];
      const selectedTimePeriod = values.timePeriod;

      const condition = field.shoWhen.find(
        (cond) => cond.timePeriod === selectedTimePeriod
      );

      if (condition) {
        const relevantConditionFields = field.conditionFields.filter(
          (conditionField) => conditionField.name === selectedTimePeriod
        );

        return relevantConditionFields.map((conditionField, index) => (
          <GridItem
            key={index}
            colSpan={conditionField.colSpan || 1}
            rowSpan={conditionField.rowSpan || 1}
          >
            {renderInputs(
              {
                ...conditionField,
                name: `vaccineDetails[${parentIndex}].${conditionField.name}`
              },
              formik,
              parentIndex
            )}
          </GridItem>
        ));
      }
    }
    return null;
  };

  const fieldComponent = () => {
    switch (field.type) {
      case "text":
        return <AppInput {...commonProps} />;
      case "email":
        return <AppEmail {...commonProps} />;
      case "tel":
        return <AppInputTel {...commonProps} />;
      case "password":
        return <AppPassword {...commonProps} />;
      case "date":
        return <AppDate {...commonProps} />;
      case "select":
        return (
          <>
            <AppSelect {...commonProps} options={field.options} />
            {renderConditionFields(field, formik, parentIndex)}
          </>
        );
      case "multi-select":
        return <AppMultiSelect {...commonProps} options={field.options} />;
      case "multiFields":
        return (
          <AppMultiFieldsFields
            {...field}
            formik={formik}
            templateColumns={field.templateColumns}
            parentIndex={parentIndex}
          />
        );
      case "checkbox":
        return <AppCheckBox {...commonProps} />;
      default:
        return null;
    }
  };

  return <Box>{fieldComponent()}</Box>;
};

