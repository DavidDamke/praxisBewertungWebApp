<template>
  <v-sheet
    width="300"
    class="mx-auto"
  >
    <v-form
      ref="form"
      @submit.prevent="createNewCompany"
    >
      <v-text-field
        v-model="unternehmen"
        label="Unternehmen"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="semester"
        label="Semester"
        required
      ></v-select>
      <v-text-field
        v-model="abteilung"
        label="Abteilung"
        required
      ></v-text-field>
      <v-textarea
        v-model="kommentar"
        counter
        label="Kommentar"
        single-line
      ></v-textarea>
      <v-btn @click="buttonPressed=!buttonPressed">
        Bewertung hinzufügen
      </v-btn>
      <div
        class="praxisstelleBewerten"
        v-if="buttonPressed"
      >
        <div class="ratingContainer">
          <p class="name">Aufgaben</p>
          <v-rating
            v-model="aufgaben"
            class="rating"
          ></v-rating>
        </div>
        <div class="ratingContainer">
          <p class="name">Betreunung</p>
          <v-rating
            v-model="betreuung"
            class="rating"
          ></v-rating>
        </div>
        <div class="ratingContainer">
          <p class="name">Gehalt</p>
          <v-rating
            v-model="gehalt"
            class="rating"
          ></v-rating>
        </div>

      </div>
      <v-btn
        class="me-4"
        type="submit"
      >
        Submit
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      buttonPressed: true,
      select: 4,
      kommentar: null,
      unternehmen: "ZF",
      abteilung: "IOT",
      semester: ["1", "2", "3", "4", "5", "6", "9", "10", "11", "12", "13"],
      gehalt: 4.5,
      betreuung: 5,
      aufgaben: 4,
      formData: {},
    };
  },
  methods: {
    createNewCompany() {
      const formData = {
        _id: this.unternehmen,
        name: this.unternehmen,
        semester: this.select,
        abteilung: this.abteilung,
        kommentar: this.kommentar,
        ratings: [
          {
            aufgaben: this.aufgaben,
            betreuung: this.betreuung,
            gehalt: this.gehalt,
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