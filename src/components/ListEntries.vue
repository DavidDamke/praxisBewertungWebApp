<template>
  <v-container>
    <v-row class="row">
      <v-col
        cols="12"
        md="full"
        v-for="company in companies"
        :key="company._id"
      >
        <v-card
          v-model="cardInfo"
          class="mx-auto my-card"
          variant="flat"
          elevation="5"
          @click="showMore"
        > <template v-slot:title>
            {{ company.name }}
          </template>
          <template v-slot:append>
            <v-rating
              id="rating"
              :model-value="avgRating(company)"
              readonly
            ></v-rating>

          </template> </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    avgRating(company) {
      var sumratings = 0;
      for (var i = 0; i < company.ratings.length; i++) {
        sumratings += company.ratings[i].score;
      }
      return sumratings / company.ratings.length;
    },
    showMore() {
      console.log("Card Clicked");
    },
  },
  data() {
    return {
      companies: [],
      ratingValue: 0,
      cardInfo: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/getAllCompanies")
      .then((response) => {
        this.companies = response.data;
        this.companies;
      })
      .catch((error) => console.error("Error:", error));
  },
};
</script>
<style scoped>
.row {
  border: 1px solid black;
}
.my-card {
  padding: 10px; /* Adjust as needed */
}
#companyContentList {
  display: flex;
  border: 1px solid black;
}
</style>