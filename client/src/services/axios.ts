import axios from "axios";

const baseURL = "http://localhost:8080/api/";
// Create a new instance of Axios
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Set the request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosInstance;