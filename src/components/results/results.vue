<template>
<v-main class="pa-0">
  <v-container fluid class="pa-0 ma-0" v-if="$vuetify.breakpoint.smAndUp">
    <v-col cols="18">
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
        <v-spacer class="col-auto" />
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on:click="goScratchSheet" large v-on="on">
              <v-icon>mdi-calendar</v-icon>
              <span>Scratchsheet</span>
            </v-btn>
          </template>
        </v-tooltip>
      </v-toolbar>
      <v-card-title></v-card-title>
    <ResultsTable v-bind:search="search"></ResultsTable>
    </v-card>
  </v-col>
  </v-container>
      <ResultsTable v-bind:search="search" v-else></ResultsTable>
  </v-main>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import ResultsTable from './resultstable.vue';

export default {
  name: 'Results',
  components: { ResultsTable },
  data: () => ({
    search: '',
  }),
  computed: {
    results() {
      return this.getResults();
    },
  },
  methods: {
    goScratchSheet() {
      this.setRoute('/scratchsheet');
      window.history.pushState(null, 'Scratchsheet', '/scratchsheet');
    },
    goBack() {
      window.history.back();
    },
    ...mapGetters(['getResults', 'getScratch']),
    ...mapMutations(['addScratch', 'rmScratch', 'setResults', 'setRoute']),
  },
};
</script>
