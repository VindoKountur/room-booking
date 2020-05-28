import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeLogin',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Users.vue'),
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Rooms.vue'),
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Bookings.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
