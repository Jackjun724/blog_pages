import Const from '@/const'

export function getToken(){
  return localStorage.getItem(Const.tokenItemName)
}

export function setToken(token){
  return localStorage.setItem(Const.tokenItemName,token);
}

