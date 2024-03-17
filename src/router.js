import { createRouter, createWebHistory } from 'vue-router';
import loginVue from './components/login/login.vue';
import AppVue from './App.vue';
import MainPageVue from './components/mainpage/MainPage.vue';
import ParxisstelleBewertenVue from './components/bewertenPage/ParxisstelleBewerten.vue';

const routes = [
    { path: '/', redirect: '/login' },     // Redirect root path to /login
    { path: '/login', component: loginVue},
    { path: '/praxisstelleBewerten', component: ParxisstelleBewertenVue},

    { path: '/mainpage', component: MainPageVue}
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router