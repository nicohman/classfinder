<template>
  <v-app>
    <v-content>
      <keep-alive>
        <component v-on:goScratch="goScratch" v-bind:is="this.routes[getRoute()]">
        </component>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

const Form = require('./components/form/form.vue').default;
const Results = require('./components/results/results.vue').default;
const Scratchsheet = require('./components/scratchsheet/scratchsheet.vue').default;
const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: { Form, Results, Scratchsheet },
  mounted() {
    window.addEventListener('popstate', () => {
      this.setRoute(window.location.pathname);
    });
    this.setRoute(window.location.pathname);
    if (localStorage.scratch) {
      this.setScratch(JSON.parse(localStorage.scratch).map((y) => {
        // eslint-disable-next-line no-param-reassign
        y.scratchDates = y.scratchDates.map((i) => {
        // eslint-disable-next-line no-param-reassign
          i.startDate = new Date(i.startDate);
          // eslint-disable-next-line no-param-reassign
          i.endDate = new Date(i.endDate);
          return i;
        });
        return y;
      }));
    }
    this.$store.watch((state, getters) => getters.getScratch, (newValue) => {
      localStorage.scratch = JSON.stringify(newValue);
    });
  },
  data: () => ({
    routes: {
      '/': Form,
      '/results': Results,
      '/scratchsheet': Scratchsheet,
    },
  }),
  methods: {
    onResults() {
      this.setRoute('/results');
    },
    goScratch() {
      this.setRoute('/scratchsheet');
    },
    ...mapMutations(['setScratch', 'setRoute']),
    ...mapGetters(['getRoute']),
  },
};
</script>
