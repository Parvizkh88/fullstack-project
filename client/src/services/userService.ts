import axios from "axios";

const baseURL = "http://localhost:8080/api/";

const registerService = async (userInfo: FormData) => {
  try {
    let response = await axios.post(`${baseURL}users/register`, userInfo);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const loginService = async (loginObj: { email: string; password: string }) => {
  
  try {
    const response = await axios.post(baseURL + "users/login", loginObj); // Call the login service
    const data = response.data.user; // Assuming the response contains the user data
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message); // Return the error response
  }
};

const logoutService = async () => {
  
  try {
    const response = await axios.post(baseURL + "users/logout"); // Call the login service
    const data = response.data.user; // Assuming the response contains the user data
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