<template>
  <v-content class="mx-auto pa-0" >
    <v-container fluid v-if="$vuetify.breakpoint.smAndUp">
      <v-card justify="center">
        <v-toolbar color="primary" dark flat>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn v-on:click="goBack" icon large v-on="on">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Go Back</span>
          </v-tooltip>
          <v-toolbar-title style="width:65vw">Scratchsheet</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-title></v-card-title>
        <v-row>
          <ScratchCalendar></ScratchCalendar>
        </v-row>
      </v-card>
    </v-container>
    <ScratchList v-else></ScratchList>
  </v-content>
</template>
<script>
import ScratchCalendar from './scratchcalendar.vue';
import ScratchList from './scratchlist.vue';

export default {
  name: 'Scratchsheet',
  components: { ScratchCalendar, ScratchList },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
