<template>
  <div>
    <v-container
      v-if="user && user.anzahlBewertungen < 1"
      class="d-flex align-center justify-center"
      style="height:90%;"
    >
      <v-col cols="12" sm="12" md="8">
        <h3>Hier kannst du dein Praxissemester bewerten</h3>
        <v-form
          fast-fail
          v-model="form"
          ref="form"
          @submit.prevent="createNewCompany"
        >
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="unternehmen"
                :items="companies"
                label="Unternehmen"
                solo
                :clearable="true"
                :rules="[required]"
              >
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="abteilung"
                label="Abteilung"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="semester"
                :items="semesterliste"
                label="Semester"
                solo
                :clearable="true"
                :rules="[required]"
              >
              </v-combobox>
            </v-col>
          </v-row>
          <div class="praxisstelleBewerten">
            <v-col cols="12" sm="6" md="6" class="ratingContainer">
              <p class="name">Aufgaben</p>
              <v-rating
                active-color="orange-lighten-1"
                v-model="aufgaben"
                class="rating"
              ></v-rating>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="ratingContainer">
              <p class="name">Betreuung</p>
              <v-rating
                active-color="orange-lighten-1"
                v-model="betreuung"
                class="rating"
              ></v-rating>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="ratingContainer">
              <p class="name">Gehalt</p>
              <v-rating
                active-color="orange-lighten-1"
                v-model="gehalt"
                class="rating"
              ></v-rating>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="ratingContainer">
              <p class="name">Gesamt</p>
              <v-rating
                active-color="orange-lighten-1"
                v-model="gesamt"
                class="rating"
              ></v-rating>
            </v-col>
          </div>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="kommentar"
                counter
                label="Kommentar"
                single-line
                maxlength="500"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="weiterEmpfehlen"
                label="Ich empfehle das Unternehmen weiter"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn class="me-4" type="submit" :disabled="!form || !allRatingsFilled">
                Bewertung hinzufügen
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-container>
    <div v-else>
      <h3>Du hast bereits ein Unternehmen bewertet.</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      semesterliste: [
        "SS16",
        "WS16/17",
        "SS17",
        "WS17/18",
        "SS18",
        "WS18/19",
        "SS19",
        "WS19/20",
        "SS20",
        "WS20/21",
        "SS21",
        "WS21/22",
        "SS22",
        "WS22/23",
        "SS23",
        "WS23/24"
      ],
      gehalt: 0,
      betreuung: 0,
      aufgaben: 0,
      gesamt: 0,
      kommentar: null,
      unternehmen: "",
      abteilung: "",
      semester: null,
      weiterEmpfehlen: false,
     
      formData: {},
      companies: [],
      form: false,
      user: null
      
    };
  },
  computed: {
    ...mapState({
      userState: state => state.user
    }),
    allRatingsFilled() {
      return this.aufgaben !== 0 && this.betreuung !== 0 && this.gehalt !== 0 && this.gesamt !== 0;
    },
  },
  methods: {
    required(value) {
      return !!value || "Dieses Feld ist erforderlich";
    },
    getUser(){
      const user={
        username:this.userState,
      }
      axios
      .post("http://localhost:8080/api/getUser", user )
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => console.error("Error:", error));

    },
    
    createNewCompany() {

      const formData = {
        _id: this.unternehmen.toLowerCase(),
        name: this.unternehmen,
        ratings: [
          {
            aufgaben: this.aufgaben,
            betreuung: this.betreuung,
            semester: this.semester,
            gehalt: this.gehalt,
            gesamt: this.gesamt,
            abteilung: this.abteilung,
            kommentar: this.kommentar,
            weiterEmpfehlen: this.weiterEmpfehlen,
          },
        ],
      };
      this.formData = formData;
      this.submitCompany();
      this.updateUser();
    },
    async submitCompany() {
      try {
        console.log("In SubmitCompany");
        const response = await axios.post("http://localhost:8080/api/addNewCompany", this.formData); //Add or Update Company
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    updateUser(){
      this.user.anzahlBewertungen++;
      axios
      .post("http://localhost:8080/api/updateUser", this.user )
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => console.error("Error:", error));
  
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/getAllCompanies")
      .then((response) => {
        this.companies = response.data.map((companie) => companie.name);
      })
      .catch((error) => console.error("Error:", error));

    this.getUser();
  },
};
</script>

<style scoped>
.ratingContainer {
  display: flex;
  align-items: center;
  height: 40px;
}
.name {
  flex: 1;
  min-width: 100px;
}
.rating {
  flex: none;
}
</style>
