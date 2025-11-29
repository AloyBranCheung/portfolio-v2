import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: process.env.BACKEND_URL,
});

export default axios;
