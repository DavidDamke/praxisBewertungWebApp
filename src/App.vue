<template>
  <div>
    <nav-main-page></nav-main-page>
    <router-view></router-view>

  </div>
</template>

<script>
import NavMainPage from './components/nav/NavMainPage.vue';

export default {
  name: "App",
  components: {
    NavMainPage
  },
};
</script>

<style>

</style>