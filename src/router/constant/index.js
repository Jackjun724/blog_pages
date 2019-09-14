import layout from '@/pages/layout/index'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login-index')
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/home')
      },
    ]
  }
]
