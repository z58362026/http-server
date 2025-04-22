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
        path: '/monitoring/create-and-edit',
        name: 'monitoringCreateAndEdit',
        component: () => import('../views/monitoring/create-and-edit/Index.vue'),
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
