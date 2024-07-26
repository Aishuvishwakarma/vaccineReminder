import { get } from "../api_helper";
import { COMMON_ROUTES } from "helpers/constant";

const getDashboard = (userId) =>
  get(`${COMMON_ROUTES}/get_dashboard_counts?logged_in_id=${userId}`);

const getModules = () => get(`${COMMON_ROUTES}/get_all_modules`);


export { getModules, getDashboard };
