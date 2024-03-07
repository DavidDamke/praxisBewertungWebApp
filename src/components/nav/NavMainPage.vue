<template>
  <div>
    <div class="navHeader">
      <router-link
        class="routerLink"
        to="/mainpage"
      >Praxissemster finden/bewerten</router-link>

      <v-btn @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn>
    </div>
    <div
      v-if="menuVisible"
      class="navMenu"
    >
      <router-link to="/praxisstelleBewerten">Praxisstelle bewerten</router-link>
      <router-link to="/route2">Profil</router-link>
      <router-link to="/route2">Logout</router-link>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: true,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style scoped>
div {
  height: auto;
  background-color: lightgray;
}
.routerLink {
  text-decoration: none;
}
.navHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navMenu {
  display: flex;
  flex-direction: column;
}
</style>