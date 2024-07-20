<template>
  <v-card>
    <v-tabs centered>
      <v-tab
        v-for="item in tabs"
        :key="item.route"
        :to="item.route"
      >
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-tab>
    </v-tabs>
    <button
      v-if="isLogedIn"
      @click="logout"
    >Logout</button>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isLogedIn: (state) => state.isAuthenticated,
    }),
  },
  data() {
    return {
      menuVisible: true,
      tabs: [
        {
          icon: "mdi-magnify",
          text: "Praxissemster finden",
          route: "/mainpage",
        },
        {
          icon: "mdi-plus",
          text: "Praxisstelle bewerten",
          route: "/praxisstelleBewerten",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["logoutAction"]),
    logout() {
      this.logoutAction()
        .then(() => {
          this.$router.push("/login"); // Redirect to login page or another page
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },
  },
};
</script>

<style scoped>
</style>