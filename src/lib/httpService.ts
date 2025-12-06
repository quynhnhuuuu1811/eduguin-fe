import { getTokenFromLocalStorage } from "@/utils/storage";
import axios from "axios";
const accessToken = getTokenFromLocalStorage(); // Implement this function to retrieve the token
const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
});

export default instance;
