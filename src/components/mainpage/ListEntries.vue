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
            class="mx-auto my-card"
            variant="flat"
            elevation="5"
            @click="showDialog = true; selectedCompany = company"
          >
            <template v-slot:title>
              {{ company.name }}
            </template>
            <template v-slot:append>
              <v-rating
                id="rating"
                half-increments
                :model-value="avgRating(company)"
                readonly
              ></v-rating>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog -->
    <v-dialog
      v-model="showDialog"
    >
      <v-card>
        <v-card-title>
          {{ selectedCompany ? selectedCompany.name : '' }}
          <v-rating
                id="rating"
                :model-value="avgRating(selectedCompany)"
                half-increments
                readonly
                active-color="orange-lighten-1"

              ></v-rating>
              <p>Anzahl Bewertungen {{ this.selectedCompany.ratings.length}}</p>

        </v-card-title>
        <v-card-text> 
          <div
        class="praxisstelleBewerten"
      >

        <v-col
          cols="12"
          sm="6"
          md="6"
          class="ratingContainer"
        >
          <p class="name">Aufgaben</p>
          <v-rating
            active-color="orange-lighten-1"
            :model-value="avgAufgaben(selectedCompany)"
            class="rating"
            readonly

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
            :model-value="avgBetreuung(selectedCompany)"
            class="rating"
            readonly

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
            :model-value="avgGehalt(selectedCompany)"
            class="rating"
            readonly

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
            :model-value="avgGesamt(selectedCompany)"
            class="rating"
            readonly

          ></v-rating>
        </v-col>

      </div>
          <p>Anzahl weiterEmpfehlen</p>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Close Dialog"
            @click="showDialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
      
    
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  methods: {
    avgRating(company) {
      let sumratings = 0;
      let resultRating=0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings +=
          company.ratings[i].aufgaben +
          company.ratings[i].betreuung +
          company.ratings[i].gehalt +
          company.ratings[i].gesamt;
          resultRating += sumratings / 4;
          sumratings=0;
      }

      return resultRating / company.ratings.length;
    },
    avgGehalt(company){
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings +=company.ratings[i].gehalt;
      }
      return sumratings / company.ratings.length;
    },
    avgGesamt(company){
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings +=company.ratings[i].gesamt;
      }
      return sumratings / company.ratings.length;
    },
    avgAufgaben(company){
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings +=company.ratings[i].aufgaben;
      }
      return sumratings / company.ratings.length;
    },
    avgBetreuung(company){
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings +=company.ratings[i].betreuung;
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
        showDialog: false,
      selectedCompany: null, // To hold the clicked company's data
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