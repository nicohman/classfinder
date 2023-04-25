<template>
  <v-container fluid>
    <v-calendar
      v-if="events.length > 0"
      @click:event="showClass"
      :value="today"
      type="week"
      :interval-count="config.calendarDayLength"
      :first-interval="config.calendarStartHour"
      :events="events"
      v-bind:start="events[0].start"
      :weekdays="[1,2,3,4,5]"
    >
      <template v-slot:day="{date}">
        <div>{{date}}</div>
      </template>
    </v-calendar>
    <div justify="center" v-else>
      No classes with times found for this scratch sheet
    </div>

    <!-- Popup on class click -- may want to refactor as separate component -->
    <v-menu
      v-if="selectedOpen"
      v-model="selectedOpen"
      :activator="selectedElement"
      offset-y
    >
      <v-card color="grey lighten-4" flat max-width="25rem">
        <v-card-title>{{selectedClass.name}}</v-card-title>
        <v-card-text>{{selectedClass.description}}</v-card-text>
        <v-card-actions>
          <v-btn icon @click="rmClass">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn
            target="_blank"
            :href="`https://classfinder.nicohman.com/results?name=${selectedClass.name}`"
          >
            Find other times
          </v-btn>
          <v-btn
            @click="cardClass = getScratchClassByCRN()(selectedClass.CRN)"
          >
            View More
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <!-- View More Dialog -->
    <ClassDetailsDialog v-model="cardClass" />
  </v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import ClassDetailsDialog from '../class-details-dialog.vue';
import config from '../../../config.json';

export default {
  name: 'ScratchSheetCalendar',
  data: () => ({
    selectedClass: null,
    selectedOpen: false,
    selectedElement: null,
    cardClass: undefined,
    config,
  }),
  components: { ClassDetailsDialog },
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
