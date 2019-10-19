import * as commonApi from './modules/api-list'
import * as noteApi from './modules/note-api'
import * as tagApi from './modules/tag-api'
import * as fileApi from './modules/file-api'
import * as SystemApi from './modules/system'

const apiObj = {
  commonApi,
  noteApi,
  tagApi,
  fileApi,
  SystemApi
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get () {
        return apiObj
      }
    }
  })
}

export default {
  install
}
