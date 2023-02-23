<template>
  <v-container v-if="$vuetify.breakpoint.smAndUp" fluid class="mx-auto mt-14 fill-height">
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="elevation-12 pb-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Search for Classes</v-toolbar-title>
            <v-spacer />
            <v-tooltip right>
              <span>Fun Statistics</span>
              <template v-slot:activator="{ on }">
                <v-btn target="_blank" href="https://charts.mongodb.com/charts-classfinder-upefc/public/dashboards/609031cb-0c22-4ddf-8e6c-5aaeaf683b50" icon large v-on="on" ><v-icon>mdi-chart-box</v-icon></v-btn>
              </template>
            </v-tooltip>
            <InfoDialog></InfoDialog>
          </v-toolbar>
          <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="fill-height" fluid>
    <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
  </v-container>
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
