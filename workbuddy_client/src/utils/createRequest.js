import axios from "axios";

const createRequest = axios.create({
  baseURL: "https://workbuddy-api.vercel.app",
  withCredentials: true,
});

export default createRequest;
