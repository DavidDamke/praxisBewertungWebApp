<template>
  <v-card>
    <v-tabs centered>
      <v-tab v-for="item in tabs" :key="item.route" :to="item.route">
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-tab>
      <button @click="logout"> Logout</button> 
    </v-tabs>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      menuVisible: true,
      tabs: [
        { icon: 'mdi-magnify', text: 'Praxissemster finden/bewerten', route: '/mainpage' },
        { icon: 'mdi-plus', text: 'Praxisstelle bewerten', route: '/praxisstelleBewerten' },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    ...mapActions(['logoutAction']),
    logout() {
      this.logoutAction()
        .then(() => {
          this.$router.push('/login'); // Redirect to login page or another page
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    },
  },
};
</script>

<style scoped>
</style>