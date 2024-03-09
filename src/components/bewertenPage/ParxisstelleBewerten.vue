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
      </v-row>

      <div
        class="praxisstelleBewerten"
        v-if="buttonPressed"
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
          <v-checkbox label="Würden Sie dieses Unternehmen weiterempfehlen"></v-checkbox>
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
      unternehmen: "ZF",
      abteilung: "IOT",
      gehalt: 4.5,
      betreuung: 5,
      aufgaben: 4,
      gesamt: 3,
      formData: {},
    };
  },
  methods: {
    createNewCompany() {
      const formData = {
        _id: this.unternehmen,
        ratings: [
          {
            type: "rating", //TODO noch testen
            aufgaben: this.aufgaben,
            betreuung: this.betreuung,
            gehalt: this.gehalt,
            gesamt: this.gesamt,
          },
          {
            type: "moreInformation",
            abteilung: this.abteilung,
            kommentar: this.kommentar,
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