import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router';

export const Layout = () => import('@/layout/index.vue');

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
};

export const filterAsyncRoutes = (routes, roles) => {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
};

const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: [],
    addRoutes: []
  }),
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
});

export default usePermissionStore;
