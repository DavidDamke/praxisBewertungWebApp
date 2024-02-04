<template>
  <div>
    <search></search>
    <!-- <filter-companies></filter-companies> -->
    <list-entries></list-entries>

  </div>
</template>

<script>
import FilterCompanies from "./FilterCompanies.vue";
import ListEntries from "./ListEntries.vue";
import Search from "./Search.vue";
export default {
  components: { ListEntries, Search, FilterCompanies },
};
</script>

<style>
</style>