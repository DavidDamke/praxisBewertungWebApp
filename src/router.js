import { createRouter, createWebHistory } from 'vue-router';
import loginVue from './components/login.vue';
import AppVue from './App.vue';

const routes = [
    { path: '/', redirect: '/login' },     // Redirect root path to /login
    { path: '/login', component: loginVue },

    { path: '/app', component: AppVue },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router