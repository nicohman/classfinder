<template>
<v-container fluid>
  <ClassCard v-model="cardClass"></ClassCard>
    <v-calendar
      @click:event="showClass"
      v-if="events.length > 0"
      :value="today"
      type="week"
      interval-count="12"
      first-interval="6"
      :events="events"
      v-bind:start="events[0].start"
      :weekdays="[1,2,3,4,5]"
    >
    <template v-slot:day="{date}"><div>{{date}}</div>
    </template>
    </v-calendar>
    <v-content justify="center" v-else>
      <span>Sorry, but you don't have any classes added to your scratchsheet!</span>
    </v-content>
    <v-menu v-model="selectedOpen" v-if="selectedOpen" :activator="selectedElement" offset-x>
      <v-card color="grey lighten-4" flat>
        <v-card-title>{{selectedClass.name}}</v-card-title>
        <v-card-text>{{selectedClass.description}}</v-card-text>
        <v-card-actions>
          <v-btn icon v-on:click="rmClass">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn
            target="_blank"
            v-bind:href="`https://classfinder.demenses.net/results?name=${selectedClass.name}`"
          >Find other times</v-btn>
          <v-btn v-on:click="cardClass = getScratchClassByCRN()(selectedClass.CRN)">View More</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import ClassCard from '../classcard.vue';

export default {
  name: 'ScratchCalendar',
  data: () => ({
    selectedClass: null,
    selectedOpen: false,
    selectedElement: null,
    cardClass: undefined,
  }),
  components: { ClassCard },
  computed: {
    events() {
      // eslint-disable-next-line no-unused-vars
      return this.getScratch()
        .map((i) => i.scratchDates)
        .flat();
    },
    today() {
      return this.events[0].start;
    },
  },
  methods: {
    showClass({ nativeEvent, event }) {
      this.selectedClass = event;
      this.selectedElement = nativeEvent.target;
      this.selectedOpen = true;
    },
    rmClass() {
      this.selectedOpen = false;
      const gotClass = this.getScratch().filter(
        (i) => i.CRN === this.selectedClass.CRN,
      )[0];
      this.rmScratch(gotClass);
    },
    ...mapGetters(['getScratch', 'getScratchClassByCRN']),
    ...mapMutations(['rmScratch']),
  },
};
</script>
