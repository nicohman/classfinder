<template>
<v-container fluid>
    <v-list v-if="events.length > 0">
        <v-list-item two-line v-for="event in events" v-bind:key="event.start">
                    <v-list-item-content>
          <v-list-item-title>{{event.name }}</v-list-item-title>
          <v-list-item-subtitle>{{event.startDate.toTimeString().substr(0, 5)}}-{{event.endDate.toTimeString().substr(0, 5)}}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>

    </v-list>
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
        </v-card-actions>
      </v-card>
    </v-menu>
</v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ScratchList',
  data: () => ({
    selectedClass: null,
    selectedOpen: false,
    selectedElement: null,
  }),
  computed: {
    events() {
      // eslint-disable-next-line no-unused-vars
      return this.getScratch()
        .map((i) => i.scratchDates)
        .flat().sort((a, b) => a.startDate - b.startDate);
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
