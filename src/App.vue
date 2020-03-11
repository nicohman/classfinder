<template>
  <v-app>
    <v-content>
      <keep-alive>
        <component v-bind:results="results" v-on:results="onResults" v-bind:is="this.routes[route]">
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
  },
  data: () => ({
    results: [],
    routes: {
      '/': Form,
      '/results': Results,
      '/scratchsheet': Scratchsheet,
    },
    route: window.location.pathname,
  }),
  methods: {
    onResults(data) {
      this.results = data;
      this.route = '/results';
    },
  },
};
</script>
