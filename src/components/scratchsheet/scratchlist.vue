<template>

  <v-container fluid class="pa-0">
    <ClassCard v-model="selectedClass" fullscreen></ClassCard>
    <v-list v-if="events.length > 0" dense min-width="100vw">
      <v-container v-for="(day,i) in eventsByDay" v-bind:key="i">
        <v-list-item>{{dayNumToWord(day[0].startDate.getDay())}}</v-list-item>
        <v-divider></v-divider>
        <v-list-item link two-line v-for="event in day"  v-on:click="showClass(event)" v-bind:key="event.start">
          <v-list-item-content>
            <v-list-item-title>{{event.name }}</v-list-item-title>
            <v-list-item-subtitle>{{event.startDate.toTimeString().substr(0, 5)}}-{{event.endDate.toTimeString().substr(0, 5)}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-container>
    </v-list>
    <v-main justify="center" v-else>
      <span>You don't have any classes added to your scratchsheet with times yet.</span>
    </v-main>
  </v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import ClassCard from '../classcard.vue';

const { dayNumToWord } = require('../../util');

export default {
  name: 'ScratchList',
  data: () => ({
    selectedClass: null,
    selectedOpen: false,
    selectedElement: null,
  }),
  components: { ClassCard },
  computed: {
    events() {
      // eslint-disable-next-line no-unused-vars
      return this.getScratch()
        .map((i) => i.scratchDates)
        .flat()
        .sort((a, b) => a.startDate - b.startDate);
    },
    eventsByDay() {
      const days = [];
      this.events.forEach((event) => {
        const day = event.startDate.getDay();
        if (!days[day]) {
          days[day] = [];
        }
        days[day].push(event);
      });
      return days.filter((day) => day.length > 0);
    },
    today() {
      return this.events[0].start;
    },
  },
  methods: {
    showClass(event) {
      this.selectedClass = this.getScratchClassByCRN()(event.CRN);
    },
    rmClass() {
      this.selectedOpen = false;
      const gotClass = this.getScratch().filter(
        (i) => i.CRN === this.selectedClass.CRN,
      )[0];
      this.rmScratch(gotClass);
    },
    dayNumToWord,
    ...mapGetters(['getScratch', 'getScratchClassByCRN']),
    ...mapMutations(['rmScratch']),
  },
};
</script>
