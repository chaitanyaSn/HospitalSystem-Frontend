import axios, { InternalAxiosRequestConfig } from "axios";
import exp from "constants";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        console.log("Request Interceptor:", config);
        return config;
    }
);
export default axiosInstance;