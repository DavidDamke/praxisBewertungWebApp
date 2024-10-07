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
      <v-spacer></v-spacer>
      <v-tab v-if="isLogedIn"
      @click="logout">
      <v-icon left>mdi-logout</v-icon>
        Abmelden
      </v-tab>
    </v-tabs>
    
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
          text: "Praxisstelle finden",
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
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },
  },
};
</script>

<style scoped>
  div{
    background-color: #6638b6;
  }
  .v-tab {
  color: white;
}

.v-icon {
  color: white;
}
</style>