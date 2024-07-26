// src/utils/apiUtils.js

import axios from "axios";
import toastr from "toastr";

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.1.21:8071/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // if (authToken !== undefined && authToken !== null) {
    // }
    config.headers["Authorization"] = `Bearer ${authToken}`;
  } else {
    config.headers["x-api-key"] = "vaccine2024";
  }
  return config;
});

const isLogin = localStorage.getItem("authToken");
// const authUser = localStorage.getItem("authUser");
// const parseUser = authUser && JSON.parse(authUser);
// const role = localStorage.getItem('authRole');
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isLogin && error.response?.status === 401) {
      localStorage.clear();
      toastr.error('session expired login again.');
      // window.location.href = `${window.location.protocol}/${window.location.host}/auth/sign-in`;
      window.location.href = `/auth/sign-in`;
    }

    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return axiosApi.delete(url, { ...config }).then((response) => response.data);
}

export default axiosApi;
