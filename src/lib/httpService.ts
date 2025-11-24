import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.eduguin.mtri.online/api",
});

export default instance;
