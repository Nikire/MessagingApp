import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_ORIGIN } from '../_config';

export const getAllMessages = async () => {
  try{
    const accessToken = Cookies.get('sessionToken');
    const response = await axios.get(`${BACKEND_ORIGIN}/messages`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    return response.data;
  }catch(e){
    console.log(e)
  }
};

export const sendMessage = async (message) => {
  try{
    const accessToken = Cookies.get('sessionToken');
    const response = await axios.post(
      `${BACKEND_ORIGIN}/messages`,
      { message },
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    );
    return response.data;
  }catch(e){
    console.log(e)
  }
};
