/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-15 08:58:23
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 11:14:58
 * @FilePath: /zdjx-cmmp/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/monitoring/Index.vue'),
    children: [
      {
        path: '/monitoring/list',
        name: 'monitoringList',
        component: () => import('../views/monitoring/list/Index.vue'),
      },
      {
        path: '/monitoring/create',
        name: 'monitoringCreate',
        component: () => import('../views/monitoring/create-and-edit/Create.vue'),
      },
      {
        path: '/monitoring/edit',
        name: 'monitoringEdit',
        component: () => import('../views/monitoring/create-and-edit/Edit.vue'),
      },
      {
        path: '/monitoring/detail',
        name: 'monitoringDetail',
        component: () => import('../views/monitoring/detail/Index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
