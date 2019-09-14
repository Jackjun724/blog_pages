import Axios from 'axios'

export function login(param){
  return Axios.post('auth',param)
}

export function getDashboardData () {
  return Axios.get('manage')
}

export function logout(){
  return post('/logout')
}
