import Main from '@/views/Main.vue';


// 不作为Main组件的子页面展示的页面单独写，如下
// export const loginRouter = {
//   path: '/login',
//   name: 'login',
//   meta: {
//     title: '主页'
//   },
//   component: () => import('@/views/login.vue')
// }


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home',
      title: '首页',
      name: 'home_index',
      component: () => import('@/views/home/home.vue')
    },
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = []

/** 上面定义的所有路由都要写在下面的routers里 */
export const routers = [
  otherRouter,
]