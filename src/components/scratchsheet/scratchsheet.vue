<template>
  <v-main class="mx-auto pa-0" justify="center">
    <v-container v-if="$vuetify.breakpoint.smAndUp" fluid justify="center">
      <v-row align="center" justify="center">
        <v-col cols="10" justify="center">
          <v-card justify="center">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title style="width:65vw">Scratchsheet</v-toolbar-title>
                <v-spacer />
                <AllCrnsDialog></AllCrnsDialog>
            </v-toolbar>
            <v-row>
              <ScratchCalendar></ScratchCalendar>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ScratchList v-else></ScratchList>
  </v-main>
</template>
<script>
import ScratchCalendar from './scratchcalendar.vue';
import ScratchList from './scratchlist.vue';
import AllCrnsDialog from './all-crns-dialog.vue';

export default {
  name: 'Scratchsheet',
  components: { ScratchCalendar, ScratchList, AllCrnsDialog },
};
</script>
