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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
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
      async login() {
        try {
          const response = await axios.post('http://localhost:8080/login', this.credentials);
          this.$router.push('/app'); // Redirect to dashboard or another protected route
        } catch (error) {
          this.errorMessage = 'Invalid username or password.';
        }
      }
    }
  };
  </script>
  