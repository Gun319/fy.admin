import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout.vue';
import Login from '../views/Login.vue';
import Index from '../views/documentation/Index.vue';
import RolesManager from '../views/documentation/RolesManager.vue';
import ErrorView from '../views/error/ErrorView.vue';
import { useStore } from '../pinia/Pinia';



const routes = [
  { path: "/login", component: Login },
  {
    path: '/', component: Layout,
    children: [
      { name: "首页", path: "index", component: Index },
      { name: "角色管理", path: "rolesmanager", component: RolesManager }
    ]
  },
  { path: '/404', component: ErrorView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * 路由拦截
 * 1、如果没有登录，则只能进入登录页面
 */
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token");
  const store = useStore();
  if ((Date.now() - store.TimeSlot) > store.Timer) {
    localStorage.setItem("token", "");
  }

  if (!token && to.path !== "/login") {
    next("login");
  } else {
    next();
  }
});

export default router;