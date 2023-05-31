<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="results"
    :search="search"
    :show-expand="$vuetify.breakpoint.smAndUp"
    :disable-sort="$vuetify.breakpoint.xsOnly"
    item-key="crn"
    max-width="100vw"
    :disable-pagination=disablePagination
    :hide-default-footer=hideDefaultFooter
    @click:row="handleClickRow"
    :expanded.sync="expandedItems"
  >
    <template v-slot:item.available="{header, value}">
      <v-chip v-bind:color="value > 0 ? 'green' : 'red'">{{value}}</v-chip>
    </template>
    <template v-slot:item.course_count="{header, value}">
      <span v-html="value"></span>
    </template>
    <template v-slot:item.time_locations="{header, value}">
      <span v-html="displayTimeLocation(value)"></span>
    </template>
    <template v-slot:item.synchronous="{header, value}">
      <span v-html="displaySync(value)"></span>
    </template>
    <template v-slot:item.remote="{header, value}">
      <span v-html="displayRemote(value)"></span>
    </template>

    <template v-slot:item.scratchBtn="{header, value, item}">
      <div v-if="$vuetify.breakpoint.xsOnly">
        <v-btn
          v-if="onScratch(item)"
          block
          color="red"
          v-on:click="rmScratch(item)"
        >Remove from Scratch Sheet</v-btn>
        <v-btn
          v-else
          width="87.75vw"
          block
          v-bind:color="getColor(item)"
          v-on:click="addScratch(item)"
        >Add to Scratch Sheet</v-btn>
      </div>
      <div v-else>
        <div v-if="!onScratch(item)">
          <v-badge
            v-if="checkScratchOverlap(item)"
            color="error"
            content="Conflicts"
            offset-x="30"
            offset-y="10"
            :style="{'width': '100%'}"
          >
            <v-tooltip bottom nudge-top="5rem">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="addScratch(item)" color="primary" plain outlined text block>Add</v-btn>
              </template>
              <span>to Scratch Sheet</span>
            </v-tooltip>
          </v-badge>
          <v-tooltip v-else bottom nudge-top="5rem">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="addScratch(item)" color="primary" block>Add</v-btn>
            </template>
            <span>to Scratch Sheet</span>
          </v-tooltip>
        </div>
        <v-tooltip v-else bottom nudge-top="5rem">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="rmScratch(item)" color="primary" block>Remove</v-btn>
          </template>
          <span>from Scratch Sheet</span>
        </v-tooltip>
      </div>
    </template>

    <!-- xs screen: custom expansion behavior components -->
    <template v-if="$vuetify.breakpoint.xsOnly" v-slot:item.data-table-expand="{item}">
      <v-btn block width="87.75vw" @click="shownClass = item">View More</v-btn>
      <ClassDetailsDialog fullscreen v-model="shownClass" />
    </template>
    <!-- bigger screen: custom expanded row -->
    <template v-else v-slot:expanded-item="{ headers, item }">
      <ResultExpanded :item="item" :headers="headers" />
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
import ResultExpanded from './result-expanded.vue';
import ClassDetailsDialog from '../class-details-dialog.vue';

const util = require('../../util');

export default {
  name: 'ResultsTable',
  components: { ResultExpanded, ClassDetailsDialog },
  props: {
    search: String,
  },
  data: () => ({
    headers: [
      { text: 'Open Spots', value: 'available' },
      { text: 'Class Code', value: 'name' },
      { text: 'CRN', value: 'crn' },
      { text: 'Class Name', value: 'title' },
      { text: 'Cap/Enrolled/Open', value: 'course_count' },
      { text: 'Instructor', value: 'instructor' },
      { text: 'GUR Attributes', value: 'gurs' },
      { text: 'Meetings', value: 'time_locations' },
      { text: 'Sync/Async', value: 'synchronous' },
      { text: 'F2F/Remote', value: 'remote' },
      { text: '', value: 'scratchBtn' },
      { text: '', value: 'data-table-expand' },
    ],
    search: '',
    parsed: [],
    shownClass: undefined,
    disablePagination: true,
    hideDefaultFooter: true,
    expandedItems: [],
  }),
  computed: {
    results() {
      return this.getResults();
    },
  },
  methods: {
    handleClickRow(item, _, event) {
      if (
        event.target.type === 'BUTTON'
        // || event.target.className === 'v-btn__content'
        || event.target.parentElement.type === 'button'
      ) {
        return null;
      }

      const index = this.expandedItems.indexOf(item);
      if (index > -1) {
        this.expandedItems.splice(index, 1);
        // console.log(`closing expanded ${item.Name}`);
      } else {
        this.expandedItems.push(item);
        // console.log(`expanding ${item.Name}`);
      }

      return item; // not currently used
    },
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
        const strings = timeLocs.filter((i) => i).map((i) => JSON.parse(i)).map(
          (i) => `${i.location ? `${i.location}: ` : ''}${i.days.join('')} ${i.start_time}-${i.end_time}`,
        );
        return strings.join('<br />');
      }
      return 'TBA';
    },
    // displayExpanded(item) {
    //   return `<br></br><strong>Credits</strong>: ${item.Credits}<br></br><strong>Dates</strong>: ${item.StartDate}-${item.EndDate}<br></br><strong>Description</strong>: ${item.Description}<br></br>`;
    // },
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
        // this.setResults(await util.fetchClasses(split[1]));
      }
    }
  },
};
</script>
