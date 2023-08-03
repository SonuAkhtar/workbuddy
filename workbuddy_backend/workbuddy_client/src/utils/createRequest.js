import axios from "axios";

const createRequest = axios.create({
  baseURL: "https://workbuddy-api.vercel.app/",
});

export default createRequest;
