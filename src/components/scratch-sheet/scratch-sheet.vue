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
              <v-spacer />
              <AllCrnsDialog />
          </v-toolbar>
          <v-card-text>
            <ScratchSheetCalendar />
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

export default {
  name: 'ScratchSheetPage',
  components: { ScratchSheetCalendar, ScratchSheetList, AllCrnsDialog },
};
</script>
