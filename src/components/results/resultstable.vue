<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="results"
    :search="search"
    :show-expand="$vuetify.breakpoint.smAndUp"
    :disable-sort="$vuetify.breakpoint.xsOnly"
    item-key="CRN"
    max-width="100vw"
    :disable-pagination=disablePagination
    :hide-default-footer=hideDefaultFooter
  >
    <template v-if="$vuetify.breakpoint.smAndUp" v-slot:expanded-item="{ headers, item }">
      <Expanded v-bind:item="item" v-bind:headers="headers"></Expanded>
    </template>
    <template v-if="$vuetify.breakpoint.xsOnly" v-slot:item.data-table-expand="{item}">
      <v-btn block width="87.75vw" v-on:click="shownClass = item">View More</v-btn>
      <ClassDetailsDialog fullscreen v-model="shownClass"></ClassDetailsDialog>
    </template>
    <template v-slot:item.scratch="{header, value, item}">
      <v-badge
        :value="checkScratchOverlap(item) &ClassDetailsDialog& !onScratch(item)"
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
    <template v-slot:item.Available="{header, value}">
      <v-chip v-bind:color="value > 0 ? 'green' : 'red'">{{value}}</v-chip>
    </template>
    <template v-slot:item.TimeLocations="{header, value}">
      <span v-html="displayTimeLocation(value)"></span>
    </template>
    <template v-slot:item.Synchronous="{header, value}">
      <span v-html="displaySync(value)"></span>
    </template>
    <template v-slot:item.Remote="{header, value}">
      <span v-html="displayRemote(value)"></span>
    </template>
    <template v-slot:item.CourseCount="{header, value}">
      <span v-html="value"></span>
    </template>
    <template v-slot:footer v-if="results.length > 0">
      <span class="text--secondary ml-10">These were last updated {{ timeFrom(results[0].FetchedAt) }}</span>
    </template>
  </v-data-table>
    <v-btn v-if="$vuetify.breakpoint.xsOnly">
  </v-btn>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import moment from 'moment';
import Expanded from './expanded.vue';
import ClassDetailsDialog from '../class-details-dialog.vue';

const util = require('../../util');

export default {
  name: 'Results',
  components: { Expanded, ClassDetailsDialog },
  props: {
    search: String,
  },
  data: () => ({
    headers: [
      { text: 'Slots', value: 'Available' },
      { text: 'Class Code', value: 'Name' },
      { text: 'CRN', value: 'CRN' },
      { text: 'Name', value: 'Title' },
      { text: 'Cap/Enrolled/Available', value: 'CourseCount' },
      { text: 'Instructor', value: 'Instructor' },
      { text: 'GUR Attributes', value: 'Gurs' },
      { text: 'Classes', value: 'TimeLocations' },
      { text: 'Sync/Async', value: 'Synchronous' },
      { text: 'Remote/F2F', value: 'Remote' },
      { text: '', value: 'scratch' },
      { text: '', value: 'data-table-expand' },
    ],
    search: '',
    parsed: [],
    shownClass: undefined,
    disablePagination: true,
    hideDefaultFooter: true,
  }),
  computed: {
    results() {
      return this.getResults();
    },
  },
  methods: {
    displaySync(item) {
      if (item === 0) {
        return 'Synchronous';
      }
      if (item === 1) {
        return 'Asynchronous';
      }
      if (item === 2) {
        return 'Blended';
      }
      return item;
    },
    displayRemote(item) {
      if (item === 0) {
        return 'Face-to-Face';
      }
      if (item === 1) {
        return 'Remote';
      }
      if (item === 2) {
        return 'Hybrid';
      }
      return item;
    },
    getColor(item) {
      if (this.checkScratchOverlap(item) && !this.onScratch(item)) {
        return 'orange';
      }
      return 'green';
    },
    timeFrom(time) {
      return moment(time).fromNow();
    },
    displayTimeLocation(timeLocs) {
      if (timeLocs && timeLocs.length > 0 && timeLocs[0]) {
        const strings = timeLocs.filter((i) => i).map(
          (i) => `${i.location ? `${i.location}: ` : ''}${i.days.join('')} ${i.startTime}-${i.endTime}`,
        );
        return strings.join('<br />');
      }
      return 'TBA';
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
};
</script>
