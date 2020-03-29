<template>
  <v-content class="mx-auto pa-0">
    <v-container class="fill-height" fluid v-if="$vuetify.breakpoint.smAndUp">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Search for Classes</v-toolbar-title>
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn v-on:click="goScratchSheet" icon large v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <span>Scratchsheet</span>
              </v-tooltip>
              <InfoDialog></InfoDialog>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn v-on:click="showAdvanced = !showAdvanced" icon large v-on="on">
                    <v-icon>mdi-settings</v-icon>
                  </v-btn>
                </template>
                <span>Advanced Search Filters</span>
              </v-tooltip>
            </v-toolbar>
            <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
              <v-container v-else class="fill-height" fluid>
            <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
          </v-container>
  </v-content>
</template>
<script>
import { mapMutations } from 'vuex';
import ClassForm from './form.vue';
import InfoDialog from './info.vue';

export default {
  name: 'Search',

  components: { ClassForm, InfoDialog },
  data: () => ({
    showAdvanced: false,
    drawer: false,
  }),
  methods: {
    goScratchSheet() {
      this.setRoute('/scratchsheet');
      window.history.pushState(null, 'Scratchsheet', '/scratchsheet');
    },
    ...mapMutations(['setRoute']),
  },
};
</script>
