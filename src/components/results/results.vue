<template>
  <v-container>
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
      <v-data-table
        :headers="headers"
        :items="parsed"
        :search="search"
        show-expand
        item-key="CRN"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <Expanded v-bind:item="item" v-bind:headers="headers"></Expanded>
        </template>
        <template v-slot:item.scratch="{header, value, item}">
          <v-badge :value="checkScratchOverlap(item) && !onScratch(item)" color="red" content="!" offset-x="20" offset-y="20" dot>
          <v-btn v-if="!onScratch(item)" v-on:click="addToScratchSheet(item)" icon large><v-icon>mdi-plus</v-icon></v-btn>
          <v-btn v-else v-on:click="removeScratchSheet(item)" icon large><v-icon>mdi-minus</v-icon></v-btn>
          </v-badge>
        </template>
        <template v-slot:item.TimeLocations="{header, value}">
          <span v-html="displayTimeLocation(value)"></span>
        </template>
        <template v-slot:item.CourseCount="{header, value}">
          <span v-html="value"></span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
const Expanded = require('./expanded.vue').default;
const util = require('../../util.js');

export default {
  name: 'Results',
  props: { results: Array, scratch: Array },
  components: { Expanded },
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
  }),
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
    addToScratchSheet(item) {
      this.$emit('addScratch', item);
    },
    removeScratchSheet(item) {
      this.$emit('rmScratch', item);
    },
    onScratch(item) {
      return this.scratch.some((i) => i.CRN === item.CRN);
    },
    checkScratchOverlap(item) {
      // eslint-disable-next-line no-param-reassign
      const allScratchDates = util.parseScratchDates(item);
      console.log(allScratchDates);
      return !allScratchDates.some((scratchDates) => !this.scratch.some((i) => {
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
  },
  async mounted() {
    const split = window.location.href.split('?');
    if (split.length > 1) {
      if (!this.results.length > 0) {
        this.parsed = await util.fetchClasses(split[1]);
      }
    }
  },
  watch: {
    async results() {
      this.parsed = this.results;
      const split = window.location.href.split('?');
      if (split.length > 1) {
        if (!this.results.length > 0) {
          this.parsed = await util.fetchClasses(split[1]);
        } else {
          this.parsed = this.results;
        }
      }
    },
  },
};
</script>
