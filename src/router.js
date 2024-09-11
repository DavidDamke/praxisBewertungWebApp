import { createRouter, createWebHistory } from 'vue-router';
import loginVue from './components/login/login.vue';
import AppVue from './App.vue';
import MainPageVue from './components/mainpage/MainPage.vue';
import ParxisstelleBewertenVue from './components/bewertenPage/ParxisstelleBewerten.vue';
import store from './store'; // Import the Vuex store


const routes = [
    { path: '/', name:'Root', redirect: '/login' },     // Redirect root path to /login
    { path: '/login',name:'Login', component: loginVue},
    { path: '/praxisstelleBewerten', component: ParxisstelleBewertenVue, meta: {requiresAuth:true}},

    { path: '/mainpage', component: MainPageVue, meta: {requiresAuth:true}}
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
    meta: { requiresAuth: true },
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.isAuthenticated) {
        next();
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  });
export default router