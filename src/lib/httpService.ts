import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
console.log("Access Token in httpService:", accessToken);
const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
});

export default instance;
