import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { FormState, responseLogin, responseRegister, User } from "@types";

const baseURL = "http://localhost:8080/api/";

const registerService = async (userInfo: FormData) => {
  //http:localhost:8080/api/users/register
  


   try {
     let response = await axios.post(`${baseURL}users/register`, userInfo);
     return response.data;
   } catch (error: any) {
     throw new Error(error.response.data.message);
   }
  

 
};

// search to direct to detail page ---------------------------
const loginService = createAsyncThunk(
  "users/login",
  async (loginObj: object) => {
    let response = await axios.post(baseURL + "users/login", loginObj);
    let data: responseLogin = await response.data;
    return data;
  }
);

export { registerService, loginService };
