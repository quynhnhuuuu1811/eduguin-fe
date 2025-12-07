import { getTokenFromLocalStorage } from "@/utils/storage";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getTokenFromLocalStorage();

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
