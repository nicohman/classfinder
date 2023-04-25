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
            <ScratchSheetCalendar term="selectedTerm" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <ScratchSheetList v-else />
</template>
<script>
import ScratchSheetCalendar from './scratch-sheet-calendar.vue';
import ScratchSheetList from './scratch-sheet-list.vue';
import AllCrnsDialog from './all-crns-dialog.vue';

// import { terms } from '../../selectOptions';
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
  mounted() {
    console.log(JSON.stringify(options.terms, null, 2));
    console.log(JSON.stringify(this.terms, null, 2));
  },
};
</script>
