import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios';

function AdminAuth(to, from, next) {
  const token = localStorage.getItem('token');
  if(token) {

    const req = {
      headers: {
        Authorization: 'Bearer ' +  token
      }
    };

    axios.post("http://localhost:8686/validate", {}, req).then(response => {
      console.log(response);
      next();
    }).catch(error => {
      console.log(error);
      next('/login');
    })
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/:id',
    name: 'user-show',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue'),
    beforeEnter: AdminAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
