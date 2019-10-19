import Axios from 'axios'

export function Submit(param){
  return Axios.get('system/unknown',param)
}

export function GoodsList(){
  return Axios.get('system/get-goods')
}
