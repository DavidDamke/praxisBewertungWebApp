<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh;"
  >
    <v-virtual-scroll
      :items="filteredCompanies"
      height="800"
    >
      <template v-slot:default="{ item }">
        <v-card
          class="mx-auto py-4"
          variant="outlined"
          @click="showDialog = true; selectedCompany = item"
        >
          <template v-slot:title>
            {{ item.name }}
          </template>
          <template v-slot:append>
            <v-rating
              id="rating"
              half-increments
              :model-value="avgRating(item,'gesamt')"
              readonly
            ></v-rating>
          </template>
        </v-card>

      </template>

    </v-virtual-scroll>

    <!-- Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="70%"
    >
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
          <v-virtual-scroll
            :items="ratingsWithComments"
            item-height="50"
          >
            <template v-slot:default="{ item }">
              <v-card
                class="mx-auto my-card"
                variant="outlined"
              >
                <v-card-titel>
                  {{item.kommentar}}
                </v-card-titel>
                <v-card-text>
                  {{ item.semester }}
                  <v-rating
                    active-color="orange-lighten-1"
                    :model-value="item.gesamt"
                    class="rating"
                    readonly
                  ></v-rating>
                </v-card-text>
              </v-card>

            </template>

          </v-virtual-scroll>

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
      items: Array.from({ length: 1000 }, (k, v) => v + 1),
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
</style>