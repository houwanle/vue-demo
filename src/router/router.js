import Main from "@/views/Main.vue";


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
  // name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home',
      // title: '首页',
      name: '首页',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: 'basic-info/mine-info',
      name: '个人信息',
      component: () => import('@/views/basic-info/mine-info.vue')
    },
    {
      path: 'form/dynamic-form',
      name: '动态表单',
      component: () => import('@/views/form/dynamic-form.vue')
    },
    {
      path: 'tree/iview-tree',
      name: 'iview-tree',
      component: () => import('@/views/tree/iview-tree.vue')
    },
    {
      path: 'map/echart-map',
      name: 'echart-map',
      component: () => import('@/views/map/echart-map.vue')
    },
    
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = []

/** 上面定义的所有路由都要写在下面的routers里 */
export const routers = [
  otherRouter,
]