<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height:90%;"
  >

    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-virtual-scroll
        :items="filteredCompanies"
        height="800"
      >
        <template v-slot:default="{ item }">
          <v-card
            class="my-card"
            variant="outlined"
            @click="showDialog = true; selectedCompany = item"
          >
            <template v-slot:title>
              {{ item.name }}
            </template>
            <template v-slot:append>
              <v-rating
                active-color="orange-lighten-1"
                id="rating"
                half-increments
                :model-value="avgRating(item,'gesamt')"
                readonly
              ></v-rating>
            </template>
          </v-card>

        </template>

      </v-virtual-scroll>
    </v-col>
    <!-- Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="50%"
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
              <p class="name">Gesamt</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,'gesamt')"
                class="rating"
                readonly
                half-increments
              ></v-rating>
            </v-col>

          </div>
          <p>Anzahl Bewertungen: {{ this.selectedCompany.ratings.length}}</p>

          <v-virtual-scroll
            :items="this.selectedCompany.ratings"
            max-height="400"
          >
            <template v-slot:default="{ item }">
              <v-card
                class="my-card"
                variant="outlined"
              >
                <v-card-item>
                  <v-card-titel>
                    <v-rating
                      active-color="orange-lighten-1"
                      :model-value="item.gesamt"
                      class="rating"
                      readonly
                    ></v-rating>
                    {{ item.gesamt }}/5
                  </v-card-titel>
                  <v-card-subtitle>
                    Semester: {{ item.semester }}
                    Weiterempfehlung: {{item.weiterEmpfehlen ? "Ja" : "Nein"}}
                  </v-card-subtitle>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  {{item.kommentar}}
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
          >Schließen</v-btn>
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
    items2() {
      return this.companies;
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
v-card-item {
  display: inline;
}

.my-card {
  margin-bottom: 5px; /* Margin around each card */
  padding: 20px; /* Padding inside each card */
}
</style>