<template>
  <div id="app" class="application">
    <div class="layout">
      <Combobox
        v-model="selectedCity"
        :options="cities"
        :filter-function="applySearchFilter"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_CITIES, FETCH_CITIES } from "@/store/types";
import Combobox from "@/components/Combobox";

export default {
  name: "app",
  components: {
    Combobox
  },
  data() {
    return {
      selectedCity: ""
    };
  },
  computed: {
    ...mapGetters({
      cities: GET_CITIES
    })
  },
  created() {
    this.fetchCities();
  },
  methods: {
    ...mapActions({
      fetchCities: FETCH_CITIES
    }),
    applySearchFilter(search, options) {
      return options.filter(option =>
        option.toLowerCase().startsWith(search.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss">
@import "/assets/styles/main";
</style>
