<template>
  <v-card
    color="grey-lighten-4"
    flat
    rounded="0"
  >
    <v-toolbar>
      <v-text-field
        label="Search"
        type="text"
        clearable
        append-inner-icon="mdi-magnify"
        @click:append-inner="onSearch"
        v-model="searchInput"
      ></v-text-field>

    </v-toolbar>
  </v-card></template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  watch: {
    searchInput(newVal, oldVal) {
      this.$emit("searchInput", newVal);
    },
  },
  methods: {
    onSearch() {
      console.log(this.searchInput);
    },
  },
};
</script>

<style>
</style>