import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout/index'
//通用路由表
import constantMapper from './constant'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: constantMapper
})

/*
  role属性控制动态路由表等级
  如果不加此属性则认定为所有角色都持有此路由
  如果为空数组则所有角色都无法进行访问
*/
/*
* meta { title : 显示在sideBar的名字 }
* icon : 支持的图标类名
*
* */
export const asyncRouterMapper = [
  {
    path: '/note',
    name: 'note-manager',
    component: layout,
    redirect: '/note/list',
    meta: {title: '文章管理'},
    icon:'el-icon-edit-outline',
    children: [
      {
        path:'/note/add',
        name:'add-note',
        meta:{title:'文章添加'},
        icon:'el-icon-edit',
        component: () => import('@/pages/note/note-add')
      },
      {
        path:'/note/list',
        name:'note-list',
        icon:'el-jack-icon-list',
        meta:{title:'文章列表'},
        component: () => import('@/pages/note/note-list')
      },
      {
        path:'/note/edit/:id',
        name:'edit-note',
        hidden:true,
        meta:{title:'文章修改'},
        component: () => import('@/pages/note/note-add')
      }
    ]
  },
  // {
  //   path: '/reply',
  //   name: 'reply-manager',
  //   component: layout,
  //   redirect: '/reply/list',
  //   meta: {title: '评论管理'},
  //   icon:'el-jack-icon-reply',
  //   children: [
  //     {
  //       path:'/reply/list',
  //       name:'reply-list',
  //       icon:'el-jack-icon-list-rich',
  //       meta:{title:'评论列表'},
  //       component: () => import('@/pages/reply/reply-list')
  //     },
  //   ]
  // },
  {
    path: '/tags',
    name: 'tags-manager',
    component: layout,
    redirect: '/tags/list',
    meta: {title: '标签管理'},
    icon:'el-jack-icon-tags',
    children: [
      {
        path:'/tags/list',
        name:'tags-list',
        icon:'el-jack-icon-list-tags',
        meta:{title:'标签列表'},
        component: () => import('@/pages/tags/tag-list')
      },
    ]
  },
  {
    path: '/file',
    name: 'file-manager',
    component: layout,
    redirect: '/tags/list',
    meta: {title: '云存储'},
    icon:'el-jack-icon-file',
    children: [
      {
        path:'/file/list',
        name:'file-list',
        meta:{title:'文件管理'},
        icon:'el-jack-icon-list-file',
        component: () => import('@/pages/cloud/file')
      },
    ]
  },
  {
    path: '/link',
    name: 'link-manager',
    component: layout,
    redirect: '/link/edit',
    meta: {title: '友情链接'},
    icon:'el-jack-icon-link',
    children: [
      {
        path:'/link/edit',
        name:'edit-link',
        meta:{title:'友链管理'},
        icon:'el-jack-icon-link-manager',
        component: () => import('@/pages/link/friend-link')
      },
    ]
  },
  {
    path: '/user',
    name: 'user-manager',
    component: layout,
    redirect: '/user/edit',
    meta: {title: '系统设置'},
    icon:'el-icon-setting',
    children: [
      {
        path:'/user/edit',
        name:'edit-user',
        meta:{title:'信息修改'},
        icon:'el-jack-icon-user-edit',
        component: () => import('@/pages/setting/setting')
      },
    ]
  },
]
