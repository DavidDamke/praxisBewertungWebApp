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
   // ListEntries,
    // Login
  },
  data: function() {
    return {
      // listOfEntries: []
    };
  },
  methods: {
    // addEntry: function(e) {
    //   axios
    //     .post("http://localhost:8080/profs/", {
    //       name: e.name,
    //       rating: e.rating
    //     })
    //     .then(response => {
    //       this.listOfEntries = response.data;
    //     });
    // },
    // editEntry: function(e) {
    //   axios
    //     .put("http://localhost:8080/profs/" + e.index, {
    //       name: e.name,
    //       rating: e.rating
    //     })
    //     .then(response => {
    //       this.listOfEntries = response.data; //TODO: change this, do not return full list
    //     });
    // },
    // removeEntry: function(e) {
    //   axios.delete("http://localhost:8080/profs/" + e.index).then(response => {
    //     this.listOfEntries = response.data;
    //   });
    // }
  },
  mounted() {
    // axios.get("http://localhost:8080/profs/").then(response => {
    //   this.listOfEntries = response.data;
    // });
  }
};
</script>

<style>

</style>