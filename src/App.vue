<template>
  <!--<v-app style="background-color: rgb(218, 231, 244)">-->
  <v-app style="background-color: rgb(250, 253, 255)">
    <MobileAppBar v-if="$vuetify.breakpoint.xsOnly"></MobileAppBar>
    <v-app-bar v-else app dark color="primary">
      <img v-if="$vuetify.breakpoint.smAndUp" :src="require('./assets/classFinderLogo.jpeg')" height="40px" fluid />
      <!-- <v-img v-if="$vuetify.breakpoint.mdAndUp" :src="require('./assets/classFinderLogo.jpeg')" contain class="fill-height" style align-self="left" justify-self="left" fluid></v-img> -->
      <!-- <v-app-bar-nav-icon>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-app-bar-nav-icon> -->
      <!-- <v-spacer width="20vw"></v-spacer> -->
      <!-- <v-toolbar-title class="grow">WWU ClassFinder</v-toolbar-title> -->
      <v-tabs
        :value="getRouteNumber()"
        @change="onTabChange($event)"
        show-arrows
      >
        <v-tab>Search Classes</v-tab>
        <v-tab>Scratch Sheet</v-tab>
        <!-- <v-tab>Schedule Builder</v-tab> -->
      </v-tabs>
      <v-tooltip right>
        <span>Fun Statistics</span>
        <template v-slot:activator="{ on }">
          <v-btn target="_blank" href="https://charts.mongodb.com/charts-classfinder-upefc/public/dashboards/609031cb-0c22-4ddf-8e6c-5aaeaf683b50" icon large v-on="on" ><v-icon>mdi-chart-box</v-icon></v-btn>
        </template>
      </v-tooltip>
      <InfoDialog />
    </v-app-bar>
    <v-main fluid class="mt-16">
      <keep-alive>
        <component v-bind:is="this.routes[getRoute()]">
        </component>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import MobileAppBar from './components/mobile/mobile-app-bar.vue';
import SearchPage from './components/search/search-page.vue';
import ResultsPage from './components/results/results-page.vue';
import ScratchSheetPage from './components/scratch-sheet/scratch-sheet-page.vue';
import MobileInfoPage from './components/mobile/mobile-info-page.vue';
import ScheduleBuilderPage from './components/schedule-builder/schedule-builder-page.vue';
import InfoDialog from './components/info-dialog.vue';

const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: {
    SearchPage, ResultsPage, ScratchSheetPage, MobileAppBar, InfoDialog,
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
      '/': SearchPage,
      '/results': ResultsPage,
      '/scratchsheet': ScratchSheetPage,
      '/information': MobileInfoPage,
      '/schedulebuilder': ScheduleBuilderPage,
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
