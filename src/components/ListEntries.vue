<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="company in companies" :key="company._id">
          <v-list-item-content id="companyContentList">
            <v-list-item-content>{{ company.name }}</v-list-item-content>
            <v-list-item-content><v-rating  id="rating" :model-value="avgRating(company)" readonly></v-rating></v-list-item-content>
         
            <!-- <v-list-item-subtitle>{{ company.industry }} - {{ company.location }}</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  import axios from 'axios';

export default {

  methods: {
    avgRating(company) {
      var sumratings = 0;
      for (var i = 0; i < company.ratings.length; i++){
        sumratings += company.ratings[i].score;
      }
            console.log(sumratings);

      return sumratings/company.ratings.length;
      }
    },
  data() {
    return {
      companies: [],
      ratingValue: 0
    };
  },
  mounted() {
    axios.get('http://localhost:8080/getAllCompanies').then(response => {
      this.companies = response.data;
    }).catch(error => console.error('Error:', error));

  },
 
}
</script>
<style scoped>
#companyContentList {
    display: flex;
}

</style>