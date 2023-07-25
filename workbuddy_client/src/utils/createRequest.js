import axios from "axios";

const createRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});

export default createRequest;
