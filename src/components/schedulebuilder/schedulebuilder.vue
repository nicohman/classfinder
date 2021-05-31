<template>
    <v-container fluid class="pa-0">
      <v-row align="center"><v-col cols="12">
      <v-dialog v-model="showPopup" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>There was a problem building a schedule</v-card-title>
          <v-card-text>
            {{ popupText }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showPopup = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card class="elevation-12 pb-12" width="30vw">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>
            Build a schedule automatically
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-2">
          <h4>This lets you enter a list of classes and then receive options of schedules containing those classes with no timeslot conflicts.</h4>
          <v-chip v-for="(classd, i) in classes" :key="classd" close @click:close="classes.splice(i, 1)">{{ classd }}</v-chip>
          <v-text-field :value="classField" @input="classField = $event.toUpperCase()" v-on:keydown.enter="addClass"></v-text-field>
          <v-btn @click="addClass()">Add Class</v-btn>
          <v-btn @click="handleBuild()">Find Schedule</v-btn>
          <v-row class="mt-5">
            <v-card v-for="(item, i) in schedule" :key="item[0].CRN">
              <v-card-title>Schedule Option #{{i + 1}}</v-card-title>
              <v-card-text>
                <v-list disabled>
              <v-list-item-group>
                <v-list-item v-for="classd in item" :key="classd.CRN">
                  <v-list-item-content>
                  {{ classd.Name }} - <span v-html="displayTimeLocation(classd.TimeLocations)"></span>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
              </v-card-text>
            </v-card>
            </v-row>
        </v-card-text>
      </v-card>
      </v-col></v-row>
  </v-container>
</template>
<script>
const { checkIndividualOverlap, parseScratchDates, fetchClasses } = require('../../util');

export default {
  name: 'ScheduleBuilder',
  data() {
    return {
      classField: '',
      classes: [],
      showPopup: false,
      popupText: '',
      schedule: [],
    };
  },
  methods: {
    async handleBuild() {
      await this.buildSchedule(this.classes);
    },
    async buildSchedule(names) {
      const parsedQuery = names.map((name) => new URLSearchParams({ name }).toString());
      const results = await Promise.all(parsedQuery.map((query) => fetchClasses(query)));
      let empty = results.filter((l) => l.length < 1);
      if (empty.length > 0) {
        empty = empty.map((_, i) => names[i]);
        this.popupError(`The classes ${empty} have no available timeslots`);
      } else {
        const schedules = this.findSchedule(results);
        if (schedules && schedules.length > 0) {
          this.schedule = schedules;
        } else {
          this.popupError('No valid schedule could be found with these classes');
        }
      }
    },
    addClass() {
      this.classes.push(this.classField);
      this.classField = '';
    },
    popupError(message) {
      this.popupText = message;
      this.showPopup = true;
    },
    findSchedule(rresults) {
      const graph = [];
      const saved = rresults;
      const results = rresults.map((r) => r.map((d) => {
        const parsed = parseScratchDates(d);
        return parsed;
      }));
      for (let i = 0; i < results.length - 1; i += 1) {
        graph[i] = results[i].map(() => results[i + 1].map((el, idx) => idx));
      }
      function findTrail(i, y, graphref, trail) {
        if (i >= graphref.length) {
          return trail;
        }
        for (let x = 0; x < graphref[i][y].length; x += 1) {
          const doc = results[i + 1][graphref[i][y][x]];
          if (!trail.some((t) => checkIndividualOverlap(t, doc))) {
            const newt = trail;
            newt.push(doc);
            const res = findTrail(i + 1, graphref[i][y][x], graphref, newt);
            if (res) {
              return res;
            }
          }
        }
        return false;
      }
      let trails = graph[0].map((y, i) => findTrail(0, i, graph, [results[0][i]])).filter((x) => x).map((x) => x.map((p) => p[0].CRN));
      trails = trails.map((trail) => trail.map((c) => saved.flat().find((x) => x.CRN === c)));
      return trails;
    },
    displayTimeLocation(timeLocs) {
      if (timeLocs && timeLocs.length > 0 && timeLocs[0]) {
        const strings = timeLocs.filter((i) => i).map(
          (i) => `${i.days.join('')} ${i.startTime}-${i.endTime}`,
        );
        return strings.join('<br />');
      }
      return 'TBA';
    },
  },
};
</script>
