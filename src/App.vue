<template>
  <v-app style="background-color: rgb(218, 231, 244)">
    <CFAppBar v-if="$vuetify.breakpoint.xsOnly"></CFAppBar>
    <v-app-bar app dark color="primary" v-else>
      <v-app-bar-title>Classfinder</v-app-bar-title>
      <v-tabs :value="getRouteNumber()" @change="onTabChange($event)">
        <v-tab>Search Classes</v-tab>
        <v-tab>Scratchsheet</v-tab>
        <v-tab>Schedule Builder</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
    <v-main fluid>
      <keep-alive>
        <component v-bind:is="this.routes[getRoute()]">
        </component>
      </keep-alive>
    </v-main>
  </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import CFAppBar from './components/mobile/appbar.vue';
import Search from './components/search/search.vue';
import Results from './components/results/results.vue';
import Scratchsheet from './components/scratchsheet/scratchsheet.vue';
import InformationMobile from './components/mobile/information.vue';
import ScheduleBuilder from './components/schedulebuilder/schedulebuilder.vue';

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
      '/information': InformationMobile,
      '/schedulebuilder': ScheduleBuilder,
    },
  }),
  methods: {
    onResults() {
      this.setRoute('/results');
    },
    getRouteNumber() {
      switch (this.getRoute()) {
        case '/':
          return 0;
        case '/scratchsheet':
          return 1;
        case '/schedulebuilder':
          return 2;
        default:
          return 0;
      }
    },
    onTabChange(ev) {
      switch (ev) {
        case 0:
          this.setRoute('/');
          break;
        case 1:
          this.setRoute('/scratchsheet');
          break;
        case 2:
          this.setRoute('/schedulebuilder');
          break;
        default:
          this.setRoute('/');
          break;
      }
      //  window.location.pathname = this.getRoute();
      window.history.replaceState(null, this.getRoute(), this.getRoute());
    },
    ...mapMutations(['setScratch', 'setRoute']),
    ...mapGetters(['getRoute']),
  },
};
</script>
