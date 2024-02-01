<template>
  <div>
    <div class="navHeader">
    <p>Praxissemster bewerten</p>

    <v-btn @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn>
    </div>
    <div v-if="menuVisible" class="navMenu">
      <router-link to="/route1">Route 2</router-link>
      <router-link to="/route2">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        menuVisible : true
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