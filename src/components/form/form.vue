<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Search for Classes</v-toolbar-title>
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn v-on:click="goScratchSheet" icon large v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <span>Scratchsheet</span>
              </v-tooltip>
              <v-dialog v-model="showDialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn dark v-on="on" icon large>
                    <v-icon>mdi-information</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Information</v-card-title>
                  <v-card-text>
                    <br />This is an alternative to WWU's
                    <a
                      href="https://admin.wwu.edu/pls/wwis/wwsktime.SelClass"
                      target="_blank"
                    >Classfinder</a> website.
                    For an outline of how it works, you can look at the
                    <a href="https://man.sr.ht/~nicohman/classfinder" target="_blank">WIP Docs</a>.
                    This is still in an alpha stage, and many planned features are not present yet or are limited in their scope.
                    The source code is available in a
                    <a href="https://git.sr.ht/~nicohman/classfinder" target="_blank">public repo</a> if you want to check it out.
                    If you have bug reports or feature sugestions, you can file an issue on
                    <a href="https://github.com/nicohman/classfinder" target="_blank">GitHub</a>.
                    Thanks to Loc Truong and Arick Grootveld, who did the majority of the work on the code that actually parses Classfinder.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="showDialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn v-on:click="showAdvanced = !showAdvanced" icon large v-on="on">
                    <v-icon>mdi-settings</v-icon>
                  </v-btn>
                </template>
                <span>Advanced Search Filters</span>
              </v-tooltip>
            </v-toolbar>
            <v-form
              ref="form"
              v-on:keydown.enter="searchClasses"
              @submit="searchClasses"
              v-model="valid"
            >
              <v-row align="center" justify="center">
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    required
                    v-model="selected.term"
                    :items="options.terms"
                    label="Term"
                    item-text="value"
                    item-value="value"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-autocomplete
                    clearable
                    v-model="selected.gur"
                    :items="options.gurs"
                    label="GUR"
                    item-text="value"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-text-field label="Course Title" v-model="selected.courseTitle"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="3" sm="3">
                  <v-autocomplete
                    clearable
                    v-model="selected.other"
                    :items="options.others"
                    label="Other Attributes"
                    item-text="value"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-autocomplete
                    clearable
                    v-model="selected.subject"
                    :items="options.subjects"
                    label="Subject"
                    item-text="value"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-autocomplete
                    clearable
                    v-model="selected.instructor"
                    :items="options.instructors"
                    label="Instructors"
                    item-text="value"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="3" sm="3">
                  <v-text-field
                    label="Course Number"
                    v-model="selected.coursenumber"
                    :rules="[courseNumberRules]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div v-if="showAdvanced">
                <v-row justify="center">
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field label="Credits" v-model="selected.credits" :rules="[numberRules]"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-checkbox v-model="selected.onlyOpen" label="Only Open Sections"></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-select
                      clearable
                      v-model="selected.days"
                      :items="options.days"
                      label="Days"
                      item-text="value"
                      item-value="code"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-autocomplete
                      clearable
                      v-model="selected.site"
                      :items="options.sites"
                      label="Site"
                      item-text="value"
                      item-value="code"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </div>
              <v-row justify="center">
                <v-col cols="12" md="2" sm="3">
                  <a href="/results" v-on:click="searchClasses">
                    <v-btn type="submit">Search</v-btn>
                  </a>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import { mapMutations } from 'vuex';

const selectOptions = require('../../selectOptions');
const { instructors } = require('../../fetched.json');
const util = require('../../util.js');

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
      term: 'Spring 2020',
      gurs: undefined,
      other: undefined,
      days: [],
      subject: undefined,
      site: undefined,
      coursenumber: undefined,
      onlyOpen: false,
      credits: undefined,
      courseTitle: undefined,
    },
    showAdvanced: false,
    valid: false,
    showDialog: false,
  }),
  methods: {
    async searchClasses(e) {
      e.preventDefault();
      if (this.valid) {
        const toParse = {};
        Object.keys(this.selected).forEach((i) => {
          if (this.selected[i] !== undefined && this.selected[i] !== []) {
            toParse[i] = this.selected[i];
          }
        });
        const queryString = new URLSearchParams(toParse).toString();
        const data = await util.fetchClasses(queryString);
        this.setResults(data);
        this.setRoute('/results');
        window.history.pushState(
          null,
          'Classfinder Results',
          `/results?${queryString}`,
        );
      }
    },
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
    goScratchSheet() {
      this.$emit('goScratch', true);
      window.history.pushState(null, 'Scratchsheet', '/scratchsheet');
    },
    ...mapMutations(['setResults', 'setRoute']),
  },
};
</script>
