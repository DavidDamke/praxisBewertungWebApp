<template>
  <v-container>
    <div class="scrollable-list">
      <v-row
        class="row"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="8"
          v-for="company in filteredCompanies"
          :key="company._id"
        >
          <v-card
            class="mx-auto py-4"
            variant="outlined"
            @click="showDialog = true; selectedCompany = company"
          >
            <template v-slot:title>
              {{ company.name }}
            </template>
            <template v-slot:append>
              <v-rating
                id="rating"
                half-increments
                :model-value="avgRating(company,'gesamt')"
                readonly
              ></v-rating>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog -->
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>
          {{ selectedCompany ? selectedCompany.name : '' }}
          <v-rating
            id="rating"
            :model-value="avgRating(selectedCompany,'gesamt')"
            half-increments
            readonly
            active-color="orange-lighten-1"
          ></v-rating>
          <p>Anzahl Bewertungen {{ this.selectedCompany.ratings.length}}</p>

        </v-card-title>
        <v-card-text>
          <div class="praxisstelleBewerten">

            <v-col
              cols="12"
              sm="6"
              md="6"
              class="ratingContainer"
            >
              <p class="name">Aufgaben</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,'aufgaben')"
                class="rating"
                readonly
                half-increments
              ></v-rating>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="6"
              class="ratingContainer"
            >
              <p class="name">Betreuung</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,'betreuung')"
                class="rating"
                readonly
                half-increments
              ></v-rating>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="6"
              class="ratingContainer"
            >
              <p class="name">Gehalt</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,'gehalt')"
                class="rating"
                readonly
                half-increments
              ></v-rating>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="6"
              class="ratingContainer"
            >
              <p class="name">Gesamt Bewertung</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,'gesamt')"
                class="rating"
                readonly
                half-increments
              ></v-rating>
            </v-col>

          </div>

          <div class="scrollable-list">
            <v-row class="row">
              <v-col
                cols="12"
                v-for="rating in ratingsWithComments"
                :key="rating"
              >
                <v-card
                  class="mx-auto my-card"
                  variant="flat"
                  elevation="5"
                >
                  <v-card-titel>
                    {{ rating.semester }}
                    <v-rating
                      active-color="orange-lighten-1"
                      :model-value="rating.gesamt"
                      class="rating"
                      readonly
                    ></v-rating>

                  </v-card-titel>
                  <v-card-text>
                    {{rating.kommentar}}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Close Dialog"
            @click="showDialog = false"
          >Close Dialog</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  computed: {
    ratingsWithComments() {
      return this.selectedCompany.ratings.filter(
        (rating) => rating.kommentar !== null
      );
    },
  },
  methods: {
    avgRating(company, atttribute) {
      if (company.ratings.length === 0) return 0;
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings += company.ratings[i][atttribute];
      }
      return sumratings / company.ratings.length;
    },
    filterCompanies() {
      console.log("Filter", this.searchValue);
      this.filteredCompanies = this.companies.filter((document) =>
        document.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
  props: {
    searchValue: "",
  },
  data() {
    return {
      showDialog: false,
      selectedCompany: null, // To hold the clicked company's data
      companies: [],
      ratingValue: 0,
      cardInfo: "",
      filteredCompanies: [],
    };
  },
  watch: {
    // Watcher for the searchValue
    searchValue(newVal, oldVal) {
      this.filterCompanies();
    },
  },
  created() {
    axios
      .get("http://localhost:8080/getAllCompanies")
      .then((response) => {
        this.companies = response.data;
        this.filterCompanies();
      })
      .catch((error) => console.error("Error:", error));
  },
};
</script>
<style scoped>
.scrollable-list {
  overflow-x: hidden; /* Enables horizontal scrolling */
  display: flex;
  justify-content: center; /* Centers the row horizontally */
}

.row {
  width: 100%; /* Ensures the row expands to fill the scrollable-list */
  min-width: 100%; /* Minimum width to maintain structure */
}

.v-card {
  width: 100%; /* Cards fill the column width */
}
</style>