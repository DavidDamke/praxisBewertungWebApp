<template>
  <v-sheet
    width="300"
    class="mx-auto"
  >
    <v-form ref="form">
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
          <v-rating class="rating"></v-rating>
        </div>
        <div class="ratingContainer">
          <p class="name">Betreunung</p>
          <v-rating class="rating"></v-rating>
        </div>
        <div class="ratingContainer">
          <p class="name">Gehalt</p>
          <v-rating class="rating"></v-rating>
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
export default {
  data() {
    return {
      buttonPressed: true,
      select: null,
      kommentar: null,
      semester: ["1", "2", "3", "4", "5", "6", "9", "10", "11", "12", "13"],
    };
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