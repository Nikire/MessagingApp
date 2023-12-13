import axios from 'axios';
import { BACKEND_ORIGIN } from '../_config';

export const login = async (username, password) => {
  const response = await axios.post(`${BACKEND_ORIGIN}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const register = async (username, password, name, email) => {
  const response = await axios.post(`${BACKEND_ORIGIN}/auth/register`, {
    username,
    password,
    name,
    email,
  });
  return response.data;
};


export const getUserInfo = async (accessToken) => {
  const response = await axios.get(`${BACKEND_ORIGIN}/auth`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  if(response.data.error){
    return false;
  }
  return response.data;
};
