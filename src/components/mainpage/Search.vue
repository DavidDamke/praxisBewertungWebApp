  <template>
    <v-card
      class="mx-auto"
      color="grey-lighten-3"
      max-width="100vH"
    >
      <v-card-text>
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Praxisstellen Suchen"
          variant="solo"
          hide-details
          single-line
          v-model="searchInput"
          clearable
        ></v-text-field>
      </v-card-text>
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
  methods: {
  
  },
};
</script>

<style>
</style>