<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="company in companies" :key="company._id">
          <v-list-item-content>
            <v-list-item-title>{{ company.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ company.industry }} - {{ company.location }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  import axios from 'axios';

export default {

  data() {
    return {
      companies: [],
    };
  },
  mounted() {
    axios.get('http://localhost:8080/getAllCompanies').then(response => {
      this.companies = response.data;
      console.log(response.data);
    }).catch(error => console.error('Error:', error));

  },
}
</script>
