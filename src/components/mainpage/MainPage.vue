<template>
  <div>
    <search @searchInput="setSearchInput"></search>
    <!-- <filter-companies></filter-companies> -->
    <list-entries :searchValue="searchInput"></list-entries>

  </div>
</template>

<script>
import FilterCompanies from "./FilterCompanies.vue";
import ListEntries from "./ListEntries.vue";
import Search from "./Search.vue";
export default {
  components: { ListEntries, Search, FilterCompanies },
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

<style>
</style>