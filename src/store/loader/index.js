/* 状态管理器 */
//被导出
import {getToken} from '@/utils/auth'
const actions = {
  setRoleLevel: level => {
    state.RoleLevel = level
  },
  setRouterMapper: mappers => {
    state.RouterMapper = mappers
  },
  generatorRouterMap: routerMap => {
    return filterAsyncRouter(routerMap, state.RoleLevel)
  },
  changeSideBarStatus: () => {
    status.SideBarIsCollapse = !status.SideBarIsCollapse
  }
}
//被导出
const getter = {
  getRouterMapper: () => {
    return state.RouterMapper
  },
  getRoleLevel: () => {
    return state.RoleLevel
  },
  getToken:() => {
    return getToken();
  }
}
//被导出
const status ={
  SideBarIsCollapse: false
}

const state = {
  RoleLevel: 0,
  RouterMapper: [],
}

/**
 * 递归过滤路由表
 * @param asyncRouterMap 路由表
 * @param role 角色LEVEL_INDEX
 */
function filterAsyncRouter (asyncRouterMap, role) {
  const res = []

  asyncRouterMap.forEach(router => {
    const tmp = router
    if (router.children) {
      tmp.children = filterAsyncRouter(router.children, role)
    }

    if (router.roles) {
      if (router.roles.includes(role)) {
        res.push(tmp)
      }
    } else {
      res.push(tmp)
    }
  })
  return res
}


export const storeObj = {
  actions,
  getter,
  status
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype,{
    $store: {
      get(){
        return storeObj
      }
    }
  })
}

export default {
  install
}
