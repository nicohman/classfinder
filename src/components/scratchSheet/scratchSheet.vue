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
              <AllCrnsBtn></AllCrnsBtn>
          </v-toolbar>
          <v-card-text>
            <ScratchCalendar></ScratchCalendar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <ScratchList v-else></ScratchList>
</template>
<script>
import ScratchCalendar from './scratchcalendar.vue';
import ScratchList from './scratchlist.vue';
import AllCrnsBtn from './all-crns-btn.vue';

export default {
  name: 'ScratchSheet',
  components: { ScratchCalendar, ScratchList, AllCrnsBtn },
};
</script>
