<template>
  <v-app>
    <CFAppBar v-if="$vuetify.breakpoint.xsOnly"></CFAppBar>
    <v-content class="fill-height mx-auto pt-4 pa-lg-auto" fluid>
      <keep-alive>
        <component v-bind:is="this.routes[getRoute()]">
        </component>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import CFAppBar from './components/mobile/appbar.vue';
import Search from './components/search/search.vue';
import Results from './components/results/results.vue';
import Scratchsheet from './components/scratchsheet/scratchsheet.vue';

const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: {
    Search, Results, Scratchsheet, CFAppBar,
  },
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
      '/': Search,
      '/results': Results,
      '/scratchsheet': Scratchsheet,
    },
  }),
  methods: {
    onResults() {
      this.setRoute('/results');
    },
    ...mapMutations(['setScratch', 'setRoute']),
    ...mapGetters(['getRoute']),
  },
};
</script>
