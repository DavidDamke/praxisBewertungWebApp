<template>
  <v-container>
    <h3>Hier kannst du dein Praxissemster bewerten</h3>
    <v-form
      ref="form"
      @submit.prevent="createNewCompany"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="unternehmen"
            label="Unternehmen"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="abteilung"
            label="Abteilung"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="semester"
            label="Semester"
            required
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

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
            v-model="aufgaben"
            class="rating"
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
            v-model="betreuung"
            class="rating"
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
            v-model="gehalt"
            class="rating"
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
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="weiterEmpfehlen"
            label="Würden Sie dieses Unternehmen weiterempfehlen"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn
            class="me-4"
            type="submit"
          >
            Bewertung hinzufügen
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      buttonPressed: true,
      kommentar: null,
      unternehmen: "",
      abteilung: "",
      gehalt: 0,
      betreuung: 0,
      aufgaben: 0,
      gesamt: 0,
      semester: null,
      weiterEmpfehlen: false,
      formData: {},
    };
  },
  methods: {
    createNewCompany() {
      const formData = {
        _id: this.unternehmen.toLowerCase(),
        name: this.unternehmen.toLowerCase(),
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
      console.log(formData);
      this.submitCompany();
    },
    async submitCompany() {
      axios
        .post("http://localhost:8080/addNewCompany", this.formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error("Error:", error));
      this.$router.push("/mainpage");
    },
  },
};
</script>

<style>
.ratingContainer {
  display: flex;
  align-items: center;
}
.name {
  flex: 1;
  min-width: 100px;
}
.rating {
  flex: none;
}
</style>