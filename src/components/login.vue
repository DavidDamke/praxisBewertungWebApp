<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="credentials.username" type="text">
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="credentials.password" type="password">
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <button @click="returnLogingSelection">back</button>

    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods:{
      
    },
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
        errorMessage: ''
      };
    },
    methods: {
      returnLogingSelection(){
          this.$router.push('/');
        },
      async login() {
        try {
          const response = await axios.post('http://localhost:8080/login', this.credentials);
          console.info(response);
          this.$router.push('/mainpage');
        } catch (error) {
          this.errorMessage = 'Invalid username or password.';
        }
      }
    }
  };
  </script>
  