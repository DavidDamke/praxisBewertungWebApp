import axios from 'axios';
import { createStore } from 'vuex';


export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    async loginAction({ commit }, credentials) {
      console.log("in storejs");
      try {
        const response = await axios.post('http://localhost:8080/login', credentials);
        if (response.status === 200) {
          commit('setAuthentication', true);
        
        }
      } catch (error) {
        console.error('Login failed:', error.response.data.message);
      }
    },
    async logoutAction({ commit }) {
      try {
        const response = await axios.post('http://localhost:8080/logout');
        if (response.status === 200) {
          commit('setAuthentication', false);
        }
      } catch (error) {
        console.error('Logout failed:', error.response.data.message);
      }
    },
  },
});
