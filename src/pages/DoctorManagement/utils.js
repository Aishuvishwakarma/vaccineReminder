export const formFields = (roles) => {
  return [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
    },
    {
      name: "mobile_number",
      label: "Mobile Number",
      type: "tel",
      placeholder: "Enter mobile number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
    {
      name: "created_date",
      label: "Created Date",
      type: "date",
    },
    {
      name: "role_id",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      options: roles.map((role) => ({ label: role.role_name, value: role.id })),
    },
  ];
};
