<template>
  <v-container
    v-if="$vuetify.breakpoint.smAndUp"
    fluid
    justify="center"
    class="mx-auto mt-14"
  >
    <v-row align="center" justify="center">
      <v-col cols="10" justify="center">
        <v-card justify="center">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Scratch Sheet</v-toolbar-title>
            <v-spacer class="col-auto" />
            <!-- <v-spacer /> -->
            <v-col cols="4">
              <v-select
                label="Select a term"
                hint="Display classes by term"
                persistent-hint
                v-model="selectedTerm"
                :items="terms"
                solo
                hide-details
              />
            </v-col>
            <!-- <v-spacer /> -->
            <AllCrnsDialog/>
          </v-toolbar>
          <v-card-text>
            <ScratchSheetCalendar
              :term="selectedTerm"
              :classEvents="classEvents"
              :sheetEmptyForTerm="sheetEmptyForTerm"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <ScratchSheetList
    v-else
    :term="selectedTerm"
    :events="classEvents"
    :noEvents="sheetEmptyForTerm"
  />
</template>
<script>
import { mapGetters } from 'vuex';

import ScratchSheetCalendar from './scratch-sheet-calendar.vue';
import ScratchSheetList from './scratch-sheet-list.vue';
import AllCrnsDialog from './all-crns-dialog.vue';

import options from '../../selectOptions';

export default {
  name: 'ScratchSheetPage',
  components: { ScratchSheetCalendar, ScratchSheetList, AllCrnsDialog },
  data() {
    return {
      // selectedTerm: options.terms.slice(-1)[0].value,
      selectedTerm: '',
      terms: options.terms.map((termObj) => termObj.value),
      // terms,
    };
  },
  computed: {
    // allScratch() {
    //   return this.getScratch();
    // },
    sheetEmptyFully() {
      return this.getScratch().length === 0;
    },
    classEvents() {
      const events = this.getScratch().filter((i) => i.Term === this.selectedTerm)
        .map((i) => i.scratchDates)
        .flat()
        .sort((a, b) => a.startDate - b.startDate); // for scratch-sheet-list
      console.log(`all scratch classes in ${this.term}: ${JSON.stringify(events, null, 2)}`);

      return events;
    },
    sheetEmptyForTerm() {
      return this.classEvents.length === 0;
    },
  },
  methods: {
    ...mapGetters(['getScratch']),
  },
  // mounted() {
  //   console.log(JSON.stringify(options.terms, null, 2));
  //   console.log(JSON.stringify(this.terms, null, 2));
  // },
};
</script>
