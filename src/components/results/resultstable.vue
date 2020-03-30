<template>
  <v-data-table
    :headers="headers"
    :items="results"
    :search="search"
    :show-expand="$vuetify.breakpoint.smAndUp"
    :disable-sort="$vuetify.breakpoint.xsOnly"
    item-key="CRN"
    max-width="100vw"
    class="ma-0 pa-0"
  >
    <template v-if="$vuetify.breakpoint.smAndUp" v-slot:expanded-item="{ headers, item }">
      <Expanded v-bind:item="item" v-bind:headers="headers"></Expanded>
    </template>
    <template v-if="$vuetify.breakpoint.xsOnly" v-slot:item.data-table-expand="{item}">
      <v-btn block width="87.75vw" v-on:click="shownClass = item">View More</v-btn>
      <ClassCard fullscreen v-model="shownClass"></ClassCard>
    </template>
    <template v-slot:item.scratch="{header, value, item}">
      <v-badge
        :value="checkScratchOverlap(item) && !onScratch(item)"
        color="red"
        content="!"
        offset-x="20"
        offset-y="20"
        dot
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <v-btn v-if="!onScratch(item)" v-on:click="addScratch(item)" icon large>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn v-else v-on:click="rmScratch(item)" icon large>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-badge>
      <v-btn
        block
        v-else-if="onScratch(item)"
        color="red"
        v-on:click="rmScratch(item)"
      >Remove from scratchsheet</v-btn>
      <v-btn
        width="87.75vw"
        block
        v-else
        v-bind:color="getColor(item)"
        v-on:click="addScratch(item)"
      >Add to scratchsheet</v-btn>
    </template>
    <template v-slot:item.TimeLocations="{header, value}">
      <span v-html="displayTimeLocation(value)"></span>
    </template>
    <template v-slot:item.CourseCount="{header, value}">
      <span v-html="value"></span>
    </template>
  </v-data-table>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import Expanded from './expanded.vue';
import ClassCard from '../classcard.vue';

const util = require('../../util.js');

export default {
  name: 'Results',
  components: { Expanded, ClassCard },
  props: {
    search: String,
  },
  data: () => ({
    headers: [
      { text: 'Class Code', value: 'Name' },
      { text: 'CRN', value: 'CRN' },
      { text: 'Name', value: 'Title' },
      { text: 'Cap/Enrolled/Available', value: 'CourseCount' },
      { text: 'Instructor', value: 'Instructor' },
      { text: 'GUR Attributes', value: 'GUR' },
      { text: 'Classes', value: 'TimeLocations' },
      { text: '', value: 'scratch' },
      { text: '', value: 'data-table-expand' },
    ],
    search: '',
    parsed: [],
    shownClass: undefined,
  }),
  computed: {
    results() {
      return this.getResults();
    },
  },
  methods: {
    getColor(item) {
      if (this.checkScratchOverlap(item) && !this.onScratch(item)) {
        return 'orange';
      }
      return 'green';
    },
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
          if (
            scratchDates.startDate.getTime() <= y.endDate.getTime()
              && scratchDates.endDate.getTime() >= y.startDate.getTime()
          ) {
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
