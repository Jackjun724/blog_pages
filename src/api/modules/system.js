import Axios from 'axios'

export function Submit(param){
  return Axios.get('system/unknown',param)
}
