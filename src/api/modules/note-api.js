import Axios from 'axios'

export function publishNote(param){
  return Axios.post('note',param)
}

export function updateNote(param){
  return Axios.put('note',param)
}

export function getNoteList(param){
  return Axios.get('note',param)
}

export function delNoteById(id){
  return Axios.delete(`note/${id}`)
}

export function getNoteInfoById (param) {
  return Axios.get('note/by',param)
}
