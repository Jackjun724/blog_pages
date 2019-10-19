import Axios from 'axios'
import {getToken} from '../auth/index'
import {Notification} from 'element-ui'
import router from '@/router/index'
import Constants from '@/const/index'

//设置默认API请求地址
Axios.defaults.baseURL = Constants.getHomeUrl() + 'api'

//用于处理 get中的array
const qs = require('qs')

//设置axios超时 默认请求头
Axios.defaults.timeout = 60000
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'})
    }
    const token = getToken()
    token && token!=='' && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
// TODO 接口请求错误统计
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Notification({
            message: '请先登录!',
            type: 'warning'
          })
          localStorage.removeItem(Constants.tokenItemName);
          router.push({path: '/login'})
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token
        // 跳转登录页面
        case 403:
          Notification({
            message: '登录身份过期，请重新登录!',
            type: 'warning'
          })
          // 清除token
          localStorage.removeItem(Constants.tokenItemName);
          router.push({path: '/login'})
          break;
        // 404请求不存在
        case 404:
          Notification({
            message: '请求地址不存在!',
            type: 'warning'
          })
          break;
        // 其他错误，直接抛出错误提示
        default:
          let msg = '未知错误！'
          if(error.response.data){
            msg = error.response.data.message
          }
          Notification({
            message: msg,
            type: 'warning'
          })
      }
      return Promise.reject(error.response);
    }
  }
);
