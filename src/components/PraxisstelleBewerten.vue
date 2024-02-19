<template>
  <v-btn @click="rateCompany">Bewerten</v-btn>

</template>

<script>
export default {
  props: {
    companyName: "",
  },
  methods: {
    rateCompany() {
      console.log(this.companyName);
    },
  },
};
</script>

<style>
</style>