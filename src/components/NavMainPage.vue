<template>
  <div>
    <div class="navHeader">
    <p>Praxissemster bewerten</p>

    <v-btn @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn>
    </div>
    <div v-if="menuVisible" class="navMenu">
      <router-link to="/route1">Praxisstelle hinzufügen</router-link>
      <router-link to="/route2">Parxisstelle suchen</router-link>
      <router-link to="/route2">Profil</router-link>
      <router-link to="/route2">Logout</router-link>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        menuVisible : false
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }

}
</script>

<style scoped>
  div{
    height: auto;
    background-color: lightgray;

  }
.navHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navMenu{
    display: flex;
    flex-direction: column;
  }


</style>