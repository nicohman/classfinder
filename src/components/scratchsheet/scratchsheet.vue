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
  // props: {scratch: Array},
  data: () => ({
    scratch: [
      {
        Attributes: [],
        TimeLocations: [{
          days: ['M', 'W', 'R', 'F'], location: 'CF 110', startTime: '10:00', endTime: '10:50',
        }],
        _id: '5e65b82251ea0831bccab0e5',
        CRN: 22304,
        Instructor: 'Roser, Philipp Alexander',
        Title: 'Principles of Physics II w/lab',
        Name: 'PHYS 115',
        Subject: 'PHYS',
        CourseNumber: '115',
        Prerequisites: 'PHYS 114',
        Credits: '5',
        Cost: '$50.00 Flat Fee',
        StartDate: '03/31',
        EndDate: '06/12',
        Capacity: 25,
        Enrolled: 25,
        Available: 0,
        Term: 'Spring 2020',
        Description: 'Fluids; kinetic theory; heat and thermodynamics; principles of electricity and magnetism. Lab.',
        __v: 0,
        score: 0.6,
        GUR: ['LSCI'],
        CourseCount: '25/25/<span style="color:red">0</span>',
      },
    ],
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
      window.location.href = '/';
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
