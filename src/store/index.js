import Vue from "vue";
import Vuex from "vuex";

import api from "@/api";
import { GET_CITIES, FETCH_CITIES } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: []
  },
  getters: {
    [GET_CITIES]: state => state.cities
  },
  mutations: {
    [FETCH_CITIES]: (state, cities) => {
      state.cities = cities;
    }
  },
  actions: {
    [FETCH_CITIES]: async ({ commit }) => {
      const cities = await api.getCities();
      commit(FETCH_CITIES, cities);
    }
  }
});
