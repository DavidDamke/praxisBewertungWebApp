<template>
  <v-card>
    <v-tabs centered>
      <v-tab v-for="item in tabs" :key="item.route" :to="item.route">
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script>
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
  },
};
</script>

<style scoped>
</style>