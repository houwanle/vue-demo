import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: history
  routes: routers
}

// router 3.x 新特性需要：解决重复进入同一路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const router = new VueRouter(RouterConfig)
