<template>
    <v-container>
      <div class="scrollable-list">

      <v-row class="row">
        <v-col
          cols="12"
          v-for="company in filterdCompanies"
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
      </div>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  methods: {
    avgRating(company) {
      var sumratings = 0;
      for (var i = 0; i < company.ratings.length; i++) {
        sumratings +=
          company.ratings[i].aufgaben +
          company.ratings[i].betreuung +
          company.ratings[i].gehalt;
        sumratings = sumratings / 3;
      }
      return sumratings / company.ratings.length;
    },
    showMore() {
      console.log("Card Clicked");
    },
    filterCompanies() {
      console.log("Filter", this.searchValue);
      this.filterdCompanies = this.companies.filter((document) =>
        document.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
  props: {
    searchValue: "",
  },
  data() {
    return {
      companies: [],
      ratingValue: 0,
      cardInfo: "",
      filterdCompanies: [],
    };
  },
  watch: {
    // Watcher for the searchValue
    searchValue(newVal, oldVal) {
      this.filterCompanies();
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/getAllCompanies")
      .then((response) => {
        this.companies = response.data;
        console.log(this.companies);
        this.filterCompanies();
      })
      .catch((error) => console.error("Error:", error));
  },
};
</script>
<style scoped>

.scrollable-list {
  max-height: 75vh; /* Adjust based on your needs */
  overflow-y: auto;
}
.row {
  border: 1px solid black;
}
.my-card {
  padding: 10px;
}
#companyContentList {
  display: flex;
  border: 1px solid black;
}
</style>