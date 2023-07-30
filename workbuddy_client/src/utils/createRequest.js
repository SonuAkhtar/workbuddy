import axios from "axios";

const createRequest = axios.create({
  baseURL: "https://workbuddy-zmfs.onrender.com/api/",
  withCredentials: true,
});

export default createRequest;
