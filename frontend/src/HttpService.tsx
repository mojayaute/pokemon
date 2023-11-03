import axios, { AxiosInstance } from "axios";

const HttpService: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default HttpService;
