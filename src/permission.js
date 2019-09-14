import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import {getToken} from './utils/auth'
import {asyncRouterMapper} from './router'
import CONST from '@/const'

//NProgress Configuration
NProgress.configure({showSpinner: false})

//设定拦截白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start() //Start progress bar Style
  if (getToken()) { //determine if there has token
    // TODO : SET ROLE LEVEL INDEX 后期如需要添加权限功能
    if (store.getter.getRoleLevel() === CONST.role.NULL_INDEX) {
      store.actions.setRoleLevel(CONST.role.ADMIN_INDEX)
      store.actions.setRouterMapper(store.actions.generatorRouterMap(asyncRouterMapper))
      router.addRoutes(store.getter.getRouterMapper())
      next({path:to.path})
    }else{
      if (to.path === '/login') {
        next({path: '/'})
      } else {
        next()
      }
    }

  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {  //判断白名单
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() //finish progress bar
})
