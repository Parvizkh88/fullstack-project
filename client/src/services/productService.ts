
import axiosInstance from "./axios";



const registerService = async (userInfo: FormData) => {
  try {
    let response = await axiosInstance.post(
      `users/register`,
      userInfo
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
