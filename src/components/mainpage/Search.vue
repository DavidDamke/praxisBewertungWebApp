  <template>
  <v-card
    class="mx-auto"
    flat
  >
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="8"
      >
        <v-text-field
          append-inner-icon="mdi-magnify"
          label="Praxisstellen Suchen"
          variant="outlined"
          hide-details
          single-line
          v-model="searchInput"
          clearable
        ></v-text-field>
      </v-col></v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  watch: {
    searchInput(newVal, oldVal) {
      this.$emit("searchInput", newVal);
    },
  },
};
</script>

<style scoped>
</style>
