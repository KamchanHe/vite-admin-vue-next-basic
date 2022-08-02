import { createRouter, createWebHashHistory } from 'vue-router';
import useStore from '@/store';

import NestedRoutes from './modules/nested';

export const Layout = () => import('@/layout/index.vue');

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
];

export const asyncRoutes = [
  NestedRoutes,
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
];

const RouterInstance = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: constantRoutes
  });

const router = RouterInstance();

export function resetRouter() {
  const { permission } = useStore();
  permission.routes.forEach((route) => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router;
