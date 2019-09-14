// User token
export default {
  tokenItemName: 'user_token',

  // 路由表权限等级
  role:{
    NULL_INDEX:0,
    ADMIN_INDEX:1,
    EDITOR_INDEX:2
  },

  getHomeUrl: () => {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:7999/'
    } else if (process.env.NODE_ENV === 'production') {
      return 'http://www.retzero.com/'
    }
  },
}
