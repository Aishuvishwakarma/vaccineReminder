import * as Yup from "yup";

export const createValidationSchema = (fields) => {
  const shape = fields.reduce((acc, field) => {
    switch (field.type) {
      case "text":
        acc[field.name] = Yup.string().required("Required");
        break;
      case "email":
        acc[field.name] = Yup.string()
          .email("Invalid email")
          .required("Required");
        break;
      case "tel":
        acc[field.name] = Yup.string().required("Required");
        break;
      case "password":
        acc[field.name] = Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Required");
        break;
      case "date":
        acc[field.name] = Yup.date().required("Required");
        break;
      case "select":
        acc[field.name] = Yup.string().required("Required");
        break;
      case "multi-select":
        acc[field.name] = Yup.array()
          .min(1, "At least one option must be selected")
          .required("Required");
        break;
      default:
        break;
    }
    return acc;
  }, {});
  return Yup.object().shape(shape);
};
