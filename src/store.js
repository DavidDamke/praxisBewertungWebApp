import axios from 'axios';
import { createStore } from 'vuex';


export default createStore({
  state: {
    isAuthenticated: false,
    user:null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state,user){
      state.user=user;
    }


  },
  actions: {
    async loginAction({ commit,dispatch }, credentials) {
      console.log("in storejs");
      // try {
      //   const response = await axios.post('http://localhost:8080/login', credentials);
      //   if (response.status === 200) {

      //     commit('setAuthentication', true);
        
      //   }
      // } catch (error) {
      //   console.error('Login failed:', error.response.data.message);
      // }
      try {

          commit('setAuthentication', true);
          commit('setUser', credentials.username);
          dispatch('addUser', credentials.username);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async logoutAction({ commit }) {
      try {
        const response = await axios.post('http://localhost:8080/logout');
        if (response.status === 200) {
          commit('setAuthentication', false);
          commit('setUser',null);

        }
      } catch (error) {
        console.error('Logout failed:', error.response.data.message);
      }
    },
    async addUser({ state }, username) {
      console.log("In addUser");
      try {
        const response = await axios.post('http://localhost:8080/addUser', {
          _id: username,
          role: 1,
          anzahlBewertungen: 0,
        });
        if (response.status === 200) {
          console.log('User added successfully');
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
  },
});
