import axiosInstance from "./axios";

const registerService = async (userInfo: FormData) => {
  try {
    let response = await axiosInstance.post(`users/register`, userInfo);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const loginService = async (loginObj: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("users/login", loginObj); // Call the login service
    const data = await response.data.user; // Assuming the response contains the user data
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message); // Return the error response
  }
};

const logoutService = async () => {
  try {
    const response = await axiosInstance.post("users/logout", {
      withCredentials: true,
    }); // Call the login service
    const data = await response.data.message; // Assuming the response contains the user data
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message); // Return the error response
  }
};

export { registerService, loginService, logoutService };

// search to direct to detail page ---------------------------
// const loginService = createAsyncThunk(
//   "user/login",
//   async (
//     loginObj: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(baseURL + "users/login", loginObj); // Call the login service
//       const data = response.data.user; // Assuming the response contains the user data
//       return data;
//     } catch (error:any) {
//       return rejectWithValue(error.response.data); // Return the error response
//     }
//   }
// );
