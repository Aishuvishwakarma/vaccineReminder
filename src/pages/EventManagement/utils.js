export const formFields = (roles) => {
  return [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      placeholder: "Enter name",
      colSpan: 1,
      rowSpan: 3,
    },
    {
      name: "Event Description",
      label: "description",
      type: "text",
      placeholder: "Enter email",
      colSpan: 1,
      rowSpan: 3,
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      name: "end_date",
      label: "End Date",
      type: "date",
      colSpan: 1,
      rowSpan: 1,
    },
    // {
    //   name: "role_id",
    //   label: "Role",
    //   type: "select",
    //   placeholder: "Select role",
    //   options: roles
    //     .map((role) => ({ label: role.role_name, value: role.id }))
    //     .filter((role) => role.label !== roleName),
    //   colSpan: 2,
    //   rowSpan: 3,
    // },
  ];
};
