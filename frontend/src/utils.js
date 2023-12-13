import Cookies from 'js-cookie';
import { getUserInfo } from './services/auth.service';

export async function checkAuth() {
  let token = Cookies.get('sessionToken');
  if(!token) return false;
  return await getUserInfo(token);
}

export function storeCookie(key,value){
  Cookies.set(key,value);
}

export function cleanCookie(key){
  Cookies.remove(key);
}