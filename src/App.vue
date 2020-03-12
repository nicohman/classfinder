<template>
  <v-app>
    <v-content>
      <keep-alive>
        <component v-bind:results="results" v-on:results="onResults" v-on:addScratch="addScratch" v-on:rmScratch="rmScratch" v-on:goScratch="goScratch" v-bind:scratch="scratch" v-bind:is="this.routes[route]">
        </component>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
const Form = require('./components/form/form.vue').default;
const Results = require('./components/results/results.vue').default;
const Scratchsheet = require('./components/scratchsheet/scratchsheet.vue').default;
const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');
const { parseScratchDates } = require('./util.js');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: { Form, Results },
  mounted() {
    window.addEventListener('popstate', () => {
      this.route = window.location.pathname;
    });
    if (localStorage.scratch) {
      this.scratch = JSON.parse(localStorage.scratch).map((y) => {
        // eslint-disable-next-line no-param-reassign
        y.scratchDates = y.scratchDates.map((i) => {
        // eslint-disable-next-line no-param-reassign
          i.startDate = new Date(i.scratchDates.startDate);
          // eslint-disable-next-line no-param-reassign
          i.endDate = new Date(i.scratchDates.endDate);
          return i;
        });
        return y;
      });
    }
  },
  data: () => ({
    results: [],
    routes: {
      '/': Form,
      '/results': Results,
      '/scratchsheet': Scratchsheet,
    },
    route: window.location.pathname,
    scratch: [],
  }),
  watch: {
    scratch(newScratch) {
      localStorage.scratch = JSON.stringify(newScratch);
    },
  },
  methods: {
    onResults(data) {
      this.results = data;
      this.route = '/results';
    },
    addScratch(item) {
      const parsedDates = parseScratchDates(item);
      // eslint-disable-next-line no-param-reassign
      item.scratchDates = parsedDates;
      this.scratch.push(item);
    },
    rmScratch(item) {
      this.scratch = this.scratch.filter((i) => i.CRN !== item.CRN);
    },
    goScratch() {
      this.route = '/scratchsheet';
    },
  },
};
</script>
