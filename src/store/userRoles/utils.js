import { getAllRoles } from "../../helpers/api/userApi";
export const login = async (dispatch) => {
  try {
    const response = await getAllRoles();
    if (response.response_data) {
      dispatch({
        type: "GET_USER_ROLE_SUCCESS",
        payload: response.response_data,
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
  }
};
