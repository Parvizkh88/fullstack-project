import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

import { responseLogin, responseRegister, User } from '@types';

const baseURL = "http://localhost:8080/api/";


const registerService = async (userInfo:User) => {
//http:localhost:8080/api/users/register
 let response = await axios.post(baseURL + "users/register", userInfo);
   console.log(response);
   
    // if(response.status!=200){
    //     return  await response.data.message;
    // }

    return "success";
  };


// search to direct to detail page ---------------------------
const loginService =

     createAsyncThunk(
       "users/login",
       async (loginObj:object) => {
         let response = await axios.post(baseURL + "users/login", loginObj);
         let data: responseLogin = await response.data;
         return data;
       }
     );



export {
    registerService,
    loginService
}