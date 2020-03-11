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
      <div v-else>Sorry, but you don't have any classes added to your scratchsheet!</div>
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
      return this.scratch.map((y) => y.TimeLocations.map((d) => d.days.map((i) => {
        const startDate = new Date();
        startDate.setDate(y.StartDate.split('/')[1]);
        startDate.setMonth(y.StartDate.split('/')[0] - 1);
        startDate.setDate(startDate.getDate() + (this.dayLetterToNum(i) - startDate.getDay()));
        const endDate = new Date(startDate.toString());
        startDate.setHours(d.startTime.split(':')[0]);
        startDate.setMinutes(d.startTime.split(':')[1]);

        endDate.setHours(d.endTime.split(':')[0]);
        endDate.setMinutes(d.endTime.split(':')[1]);
        return {
          name: y.Name,
          start: this.convertToCalenderFormat(startDate),
          end: this.convertToCalenderFormat(endDate),
        };
      }))).flat().flat().flat();
    },
    today() {
      return this.events[0].start;
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
    convertToCalenderFormat(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.toTimeString().substr(0, 5)}`;
    },
    dayLetterToNum(letter) {
      switch (letter) {
        case 'M':
          return 1;
        case 'T':
          return 2;
        case 'W':
          return 3;
        case 'R':
          return 4;
        case 'F':
          return 5;
        default:
          return 0;
      }
    },
  },
};
</script>
