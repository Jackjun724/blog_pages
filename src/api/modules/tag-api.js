import Axios from 'axios'

export function getAllTags(){
  return Axios.get('tag')
}

export function delTagByName(name) {
  return Axios.delete('tag/'+name)
}

export function addTagByName (param) {
  return Axios.post('tag',param)
}
