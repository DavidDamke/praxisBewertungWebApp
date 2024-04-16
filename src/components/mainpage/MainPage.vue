<template>
  <div>
    <search @searchInput="setSearchInput"></search>
    <list-entries :searchValue="searchInput"></list-entries>

  </div>
</template>

<script>
import ListEntries from "./ListEntries.vue";
import Search from "./Search.vue";
export default {
  components: { ListEntries, Search },
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    setSearchInput(value) {
      this.searchInput = value;
    },
  },
};
</script>

<style scoped>
</style>