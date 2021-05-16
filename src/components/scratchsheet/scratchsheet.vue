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
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn v-on:click="openCRNS" large v-on="on">
                View All CRNS
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                All CRNs
              </v-card-title>
              <v-card-text>
              <span v-bind:key="item" v-for="item in getScratch()">{{ item.Name + " - " + item.CRN }}<br /></span>
            </v-card-text>
            </v-card>
          </v-dialog>
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
import { mapGetters } from 'vuex';

import ScratchCalendar from './scratchcalendar.vue';
import ScratchList from './scratchlist.vue';

export default {
  name: 'Scratchsheet',
  components: { ScratchCalendar, ScratchList },
  methods: {
    goBack() {
      window.history.back();
    },
    openCRNS() {


    },
    ...mapGetters(['getScratch']),
  },
};
</script>
