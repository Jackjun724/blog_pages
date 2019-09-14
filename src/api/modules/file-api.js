import Axios from 'axios'

export function getFileList(param) {
  return Axios.get('file',param)
}

export function add(param) {
  return Axios.post('file',param)
}
