<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-form ref="form">
          <v-row align="center" justify="center">
            <v-col cols="12" md="3">
              <v-select
                v-model="selected.term"
                :items="options.terms"
                label="Term"
                item-text="value"
                item-value="code"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="selected.gur"
                :items="options.gurs"
                label="GUR"
                item-text="value"
                item-value="code"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Course Title" v-model="selected.courseTitle"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="selected.other"
                :items="options.others"
                label="Other Attributes"
                item-text="value"
                item-value="code"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="selected.subject"
                :items="options.subjects"
                label="Subject"
                item-text="value"
                item-value="code"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="selected.instructor"
                :items="options.instructors"
                label="Instructors"
                item-text="value"
                item-value="code"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="selected.site"
                :items="options.sites"
                label="Site"
                item-text="value"
                item-value="code"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-select
                v-model="selected.days"
                :items="options.days"
                label="Days"
                item-text="value"
                item-value="code"
                multiple
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="Course Number"
                v-model="selected.courseNumber"
                :rules="[courseNumberRules]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-checkbox v-model="selected.onlyOpen" label="Only Open Sections"></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Credits" v-model="selected.credits" :rules="[numberRules]">

              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-btn v-on:click="searchClasses">Search</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const selectOptions = require('../../selectOptions');
const { instructors } = require('../../fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'Form',

  components: {},
  data: () => ({
    options: selectOptions,
    selected: {
      instructor: undefined,
      term: undefined,
      gurs: undefined,
      other: undefined,
      days: [],
      subject: undefined,
      site: undefined,
      courseNumber: undefined,
      onlyOpen: false,
      credits: undefined,
      courseTitle: undefined,
    },
  }),
  methods: {
    searchClasses: () => {},
    courseNumberRules: (input) => {
      const regex = /[0-9]{3}/;
      try {
        return regex.exec(input.trim())[0] === input;
      } catch (e) {
        return input.length === 0;
      }
    },
    numberRules: (input) => {
      const regex = /[0-9]+/;
      try {
        return regex.exec(input.trim())[0] === input;
      } catch (e) {
        return input.length === 0;
      }
    },
  },
};
</script>
