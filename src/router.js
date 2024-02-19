import { createRouter, createWebHistory } from 'vue-router';
import loginVue from './components/login.vue';
import AppVue from './App.vue';
import MainPageVue from './components/MainPage.vue';
import LoginSelectionVue from './components/LoginSelection.vue';
import ParxisstelleHinzufügenVue from './components/ParxisstelleHinzufügen.vue';

const routes = [
    { path: '/', redirect: '/login' },     // Redirect root path to /login
    { path: '/login', component: LoginSelectionVue},
    { path: '/loginRwu', component: loginVue},
    { path: '/loginGast', component: loginVue},
    { path: '/praxisstelleHinzufügen', component: ParxisstelleHinzufügenVue},

    { path: '/mainpage', component: MainPageVue}
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router