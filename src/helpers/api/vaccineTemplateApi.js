import { get, post } from "../api_helper";

const getVaccineTemplates = async () => {
  try {
    const data = await get(`vaccine/get_vaccine_template_list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

const createVaccineTemplatesApi = (data) =>
  post(`/vaccine/create_master_vaccine_template`, data);

const deleteVaccineTemplatesApi = (vaccineId) =>
  post(`/vaccine/delete_master_vaccine`, { vaccineId });

export {
  getVaccineTemplates,
  createVaccineTemplatesApi,
  deleteVaccineTemplatesApi,
};
