<template>
  <v-container>
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
        <v-toolbar-title>Scratchsheet</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-title></v-card-title>
      <v-calendar v-if="events.length > 0" :value='today' type="week" interval-count="12" first-interval="6" :events="events" v-bind:start="events[0].start"></v-calendar>
      <v-content justify="center" v-else><span>Sorry, but you don't have any classes added to your scratchsheet!</span></v-content>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Scratchsheet',
  props: { scratch: Array },
  data: () => ({

  }),
  computed: {
    events() {
      // eslint-disable-next-line no-unused-vars
      return this.scratch.map((i) => i.scratchDates).flat();
    },
    today() {
      return this.events[0].start;
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
