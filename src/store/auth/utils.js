import { loginUser } from "../../helpers/api/authApi";
export const login = async (userData, navigate) => {
  try {
    const response = await loginUser(userData);
    localStorage.setItem("authUser", JSON.stringify(response.response_data));
    localStorage.setItem("authToken", response.token);
    navigate("/admin/default");
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
  }
};
