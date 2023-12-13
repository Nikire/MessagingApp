import axios from 'axios';
import { BACKEND_ORIGIN } from '../_config';
import { cleanCookie } from '../utils';

export const login = async (username, password) => {
  try{
    const response = await axios.post(`${BACKEND_ORIGIN}/auth/login`, {
      username,
      password,
    });
    return response.data;
  }catch(e){
    console.log(e);
    cleanCookie("sessionToken");
  }
};

export const register = async (username, password) => {
  try{
    const response = await axios.post(`${BACKEND_ORIGIN}/auth/register`, {
      username,
      password,
    });
    return response.data;
  }catch(e){
    console.log(e);
    cleanCookie("sessionToken");
  }
};


export const getUserInfo = async (accessToken) => {
  try{
    const response = await axios.get(`${BACKEND_ORIGIN}/auth`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    if(response.data.error){
      return false;
    }
    return response.data;
  }catch(e){
    console.log(e);
    cleanCookie("sessionToken");
  }
  
};
