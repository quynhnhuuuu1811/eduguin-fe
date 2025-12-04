import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
});

export default instance;
