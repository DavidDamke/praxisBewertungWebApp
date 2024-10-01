<template>
  <v-container
    class="d-flex align-center justify-center"
  >

  <v-col cols="12" sm="12" md="8">
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
    <v-virtual-scroll
      v-else
      :items="getPaginatedCompaniesList()"
      height="660"
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
              :model-value="avgRating(item, 'gesamt')"
              readonly
            ></v-rating>
          </template>
        </v-card>
      </template>
    </v-virtual-scroll>
    <v-pagination v-model="page" :length="Math.ceil(this.filteredCompanies.length/10)"></v-pagination>
  </v-col>


    <!-- Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="50%"
    >
      <v-card>
        <v-card-title class="dialogTitel">
          <p>{{ selectedCompany ? selectedCompany.name : '' }}</p>
          <v-rating
            id="rating"
            :model-value="avgRating(selectedCompany,'gesamt')"
            readonly
            active-color="orange-lighten-1"
          ></v-rating>
        </v-card-title>
        <v-card-text>


          <div class="praxisstelleBewerten">
          <v-row
            v-for="(rating, index) in ratings"
            :key="index"
            class="ratingContainer"
          >
            <v-col cols="12" class="ratingContent">
              <p class="name">{{ rating.name }}</p>
              <v-rating
                active-color="orange-lighten-1"
                :model-value="avgRating(selectedCompany,rating.name.toLowerCase())"
                class="rating"
                readonly
              ></v-rating>
            </v-col>
          </v-row>
           </div>



          <p style="font-size: small;"> Anzahl Bewertungen: {{ this.selectedCompany.ratings.length}}</p>

          <v-virtual-scroll
            :items="this.selectedCompany.ratings"
            max-height="400"
          >
            <template v-slot:default="{ item }">
              <v-card
                class="my-card"
                variant="outlined"
              >
                  <v-card-titel class="dialogTitel">
                    <v-rating
                      active-color="orange-lighten-1"
                      :model-value="item.gesamt"
                      readonly
                    ></v-rating>
                    {{ item.gesamt }}/5
                  </v-card-titel>
                  <v-card-subtitle>
                    Semester: {{ item.semester }}
                    Weiterempfehlung: {{item.weiterEmpfehlen ? "Ja" : "Nein"}}
                  </v-card-subtitle>
                
                <div v-if="item.kommentar!=null">
                <v-divider ></v-divider>
                <v-card-text>
                  {{item.kommentar}}
                </v-card-text>
              </div>
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
  methods: {

    getPaginatedCompaniesList(){
      return  this.filteredCompanies.slice(0+(this.page-1)*10,10+(this.page-1)*10); // Teilt die Liste immer In 10ner Blocks ein. page-1 so das am Anfang index 0 ist und nicht 10. 
    },

    avgRating(company, attribute) {
      if (company.ratings.length === 0) return 0;
      let sumratings = 0;
      for (let i = 0; i < company.ratings.length; i++) {
        sumratings += company.ratings[i][attribute];
      }
      return sumratings / company.ratings.length;
    },

    filterCompanies() {
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
      ratings: [
        { name: 'Aufgaben'},
        { name: 'Betreuung'},
        { name: 'Gehalt'},
        { name: 'Gesamt'},
      ],
      showDialog: false,
      selectedCompany: [], // To hold the clicked company's data
      filteredCompanies: [],
      isLoading: true,
      page:1,
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
      .get("http://localhost:8080/api/getAllCompanies")
      .then((response) => {

        this.companies = response.data;
        this.isLoading=false;
        this.filterCompanies();
      })
      .catch((error) => console.error("Error:", error));
  },
};
</script>
<style scoped>
.ratingContainer {
  margin-bottom: 16px;
  height: 30px;
}
.ratingContent {
  display: flex;
  align-items: center;
}

.dialogTitel {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}
.name {
  min-width: 100px;
}
.praxisstelleBewerten{
  margin-bottom: 50px;
}
v-card-item {
  display: inline;
}

.my-card {
  margin-bottom: 5px; /* Margin around each card */
  padding: 15px; /* Padding inside each card */
}
</style>