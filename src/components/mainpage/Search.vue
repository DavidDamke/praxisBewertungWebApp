  <template>
    <v-container  class="d-flex align-center justify-center" >
       <v-col
        cols="12"
        sm="12"
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
      </v-col>
    </v-container>
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
