export const formFields = (
  roles,
  vaccineTemplates,
  roleName,
  showPassword = true
) => {
  const common = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      name: "mobile_number",
      label: "Mobile Number",
      type: "tel",
      placeholder: "Enter mobile number",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      name: "role_id",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      options: roles
        .map((role) => ({ label: role.role_name, value: role.id }))
        .filter((role) => role.label !== roleName),
      colSpan: 2,
      rowSpan: 3,
      isCondition: true,
      checkConditions: ["3", "4"],
      conditionFields: [
        {
          name: "vaccinetemplates",
          label: "Vaccine Templates",
          placeholder: "Select The Templates",
          type: "multi-select",
          options: vaccineTemplates.map((vaccineTemplate) => ({
            label: vaccineTemplate.name,
            value: vaccineTemplate.id,
          })),
          colSpan: 1,
          rowSpan: 1,
        },
      ],
    },
  ];

  return [...common];
};
