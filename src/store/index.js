import Vue from 'vue';
import Vuex from 'vuex';

const util = require('../util.js');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    scratch: [],
    route: '',
  },
  getters: {
    getResults(state) {
      return state.results;
    },
    getScratch(state) {
      return state.scratch;
    },
    getRoute(state) {
      return state.route;
    },
  },
  mutations: {
    addScratch(state, toAdd) {
      const parsedDates = util.parseScratchDates(toAdd);
      // eslint-disable-next-line no-param-reassign
      toAdd.scratchDates = parsedDates;
      state.scratch.push(toAdd);
    },
    setScratch(state, toSet) {
      state.scratch = toSet;
    },
    setResults(state, toSet) {
      state.results = toSet;
    },
    rmScratch(state, item) {
      state.scratch = state.scratch.filter((i) => i.CRN !== item.CRN);
    },
    setRoute(state, r) {
      state.route = r;
    },
  },

});
