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
import axios from "axios";

export default {
  data() {
    return {
      form: false,
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    returnLogingSelection() {
      this.$router.push("/");
    },
    async login() {
      try {
        console.info("Hello");
        const response = await axios.post(
          "http://localhost:8080/login2",
          this.credentials
        );
        console.info(response);
        this.$router.push("/mainpage");
      } catch (error) {
        this.errorMessage = "Invalid username or password.";
      }
    },
  },
};
</script>
  