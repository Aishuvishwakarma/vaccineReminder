import { get } from "../api_helper";
import { COMMON_ROUTES } from "helpers/constant";

const getDashboard = async (userId) => {
  try {
    const data = await get(`${COMMON_ROUTES}/get_dashboard_counts?logged_in_id=${userId}`, {
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

export { getDashboard };