<template>
<v-content class="pa-0">
  <v-container fluid class="pa-0 ma-0" v-if="$vuetify.breakpoint.smAndUp">
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on:click="goBack" icon large v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Go Back</span>
        </v-tooltip>
        <v-toolbar-title>Classfinder</v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-card-title></v-card-title>
    <ResultsTable v-bind:search="search"></ResultsTable>
    </v-card>
  </v-container>
      <ResultsTable v-bind:search="search" v-else></ResultsTable>

  </v-content>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import ResultsTable from './resultstable.vue';

const util = require('../../util.js');

export default {
  name: 'Results',
  components: { ResultsTable },
  data: () => ({
    search: '',
  }),
  computed: {
    results() {
      return this.getResults();
    },
  },
  methods: {
    displayTimeLocation(timeLocs) {
      const strings = timeLocs.map(
        (i) => `${i.location}: ${i.days.join('')} ${i.startTime}-${i.endTime}`,
      );
      return strings.join('<br></br>');
    },
    displayExpanded(item) {
      return `<br></br><strong>Credits</strong>: ${item.Credits}<br></br><strong>Dates</strong>: ${item.StartDate}-${item.EndDate}<br></br><strong>Description</strong>: ${item.Description}<br></br>`;
    },
    goBack() {
      window.history.back();
    },
    onScratch(item) {
      return this.getScratch().some((i) => i.CRN === item.CRN);
    },
    checkScratchOverlap(item) {
      const allScratchDates = util.parseScratchDates(item);
      return allScratchDates.some((scratchDates) => this.getScratch().some((i) => {
        const scratch = i.scratchDates;
        return scratch.some((y) => {
          console.log(y);
          if (scratchDates.startDate.getTime() <= y.endDate.getTime() && scratchDates.endDate.getTime() >= y.startDate.getTime()) {
            return true;
          }
          return false;
        });
      }));
    },
    ...mapGetters(['getResults', 'getScratch']),
    ...mapMutations(['addScratch', 'rmScratch', 'setResults']),
  },
  async mounted() {
    const split = window.location.href.split('?');
    if (split.length > 1) {
      if (!this.results.length > 0) {
        this.setResults(await util.fetchClasses(split[1]));
      }
    }
  },
  watch: {
    async results() {
      this.parsed = this.results;
      const split = window.location.href.split('?');
      if (split.length > 1) {
        if (!this.results.length > 0) {
          this.setResults(await util.fetchClasses(split[1]));
        }
      }
    },
  },
};
</script>
