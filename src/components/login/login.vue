<template>
  <v-container>
    <v-card
      class="mx-auto px-6 py-8"
      max-width="400"
    >
      <v-alert
        type="info"
        class="mb-4 highlighted-text-alert"
        variant="outlined"
      >
        Bitte verwende deine RWU-Zugangsdaten wie für das LSF etc.
      </v-alert>
      <v-alert v-if="errorMessage" type="error" variant="outlined" class="mb-4">
         {{ errorMessage }}
      </v-alert>
      <v-form
        v-model="form"
        @submit.prevent="login"
      >
        <h2>Login</h2>
        <v-text-field
          v-model="username"
          label="RWU-Benutzername"
          clearable
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Passwort"
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

export default {
  data() {
    return {
      form: false,
      errorMessage: '',
      username: '',
      password: '',
    };
  },
  methods: {
    required(v) {
      return !!v || 'Dieses Feld ist erforderlich';
    },

    ...mapActions(['loginAction']),
    async login() {
      try {
        await this.loginAction({ username: this.username, password: this.password });
        this.errorstatus=200;
        this.$router.push('/mainpage');
      } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Die Nutzerdaten sind nicht bekannt!';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
    },
  },
};
</script>
