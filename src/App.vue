<template>
  <!--<v-app style="background-color: rgb(218, 231, 244)">-->
  <v-app style="background-color: rgb(250, 253, 255)">
    <CFAppBar v-if="$vuetify.breakpoint.xsOnly"></CFAppBar>
    <v-app-bar app dark color="primary" v-else>
      <v-toolbar-title class="grow">WWU Classfinder</v-toolbar-title>
      <v-tabs :value="getRouteNumber()" @change="onTabChange($event)">
        <v-tab>Search Classes</v-tab>
        <v-tab>Scratchsheet</v-tab>
        <v-tab>Schedule Builder</v-tab>
      </v-tabs>
      <v-tooltip right>
        <span>Fun Statistics</span>
        <template v-slot:activator="{ on }">
          <v-btn target="_blank" href="https://charts.mongodb.com/charts-classfinder-upefc/public/dashboards/609031cb-0c22-4ddf-8e6c-5aaeaf683b50" icon large v-on="on" ><v-icon>mdi-chart-box</v-icon></v-btn>
        </template>
      </v-tooltip>
      <InfoDialog></InfoDialog>
    </v-app-bar>
    <v-main fluid>
      <keep-alive>
        <component v-bind:is="this.routes[getRoute()]">
        </component>
      </keep-alive>
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
import InfoDialog from './components/search/info.vue';

const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: {
    Search, Results, Scratchsheet, CFAppBar, InfoDialog,
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
