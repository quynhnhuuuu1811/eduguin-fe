import axios, { AxiosRequestConfig } from "axios";

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    
    if (config.data instanceof FormData) {
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
      config.headers.delete("Content-Type");
    } else {
      config.headers.set("Content-Type", "application/json");
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
