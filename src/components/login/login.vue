<template>
  <v-container>
    <v-card
      class="mx-auto px-6 py-8"
      max-width="400"
    >
      <v-form
        v-model="form"
        @submit.prevent="login"
      >
        <h2>Login</h2>
        <v-text-field
          v-model="username"
          label="Username"
          clearable
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          clearable
          :rules="[required]"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          :disabled="!form"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>

  </v-container>
</template>
  
  <script>
import { mapActions } from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      form: false,
      errorMessage: "",
      username: "",
      password: "",
    };
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    ...mapActions(['loginAction']),
    
    login() {
      console.log("in Login function");
      this.loginAction({ username: this.username, password: this.password })
        .then(() => {
          this.$router.push("/mainpage");
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    },
    // async login() {
    //   try {
    //     let credentials = {
    //       username: this.username,
    //       password: this.password,
    //     };
    //     const response = await axios.post(
    //       "http://localhost:8080/login",
    //       credentials
    //     );
    //     console.info(response);
    //     this.$router.push("/mainpage");
    //   } catch (error) {
    //     this.errorMessage = "Invalid username or password.";
    //   }
    // },
  },
};
</script>
  