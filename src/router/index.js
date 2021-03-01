import Vue from 'vue';
import VueRouter from 'vue-router';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store/index';
import Enroll from '../views/layout/Enroll.vue';

Vue.use(VueRouter);

const ayncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      hidden: false,
      icon: 'shop',
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'profile',
        },
        component: () => import('../views/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '商品添加',
          hidden: false,
          icon: 'file-add',
        },
        component: () => import('../views/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          hidden: false,
          icon: 'database',
        },
        component: () => import('../views/page/category.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden: false,
          icon: 'bar-chart',
        },
        component: () => import('../views/page/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登入',
      hidden: true,
    },
    component: Login,
  },
  {
    path: '/enroll',
    name: 'Enroll',
    meta: {
      title: '退出',
      hidden: true,
    },
    component: Enroll,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/enroll') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
