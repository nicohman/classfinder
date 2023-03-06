<template>
  <v-form
    ref="form"
    v-on:keydown.enter="searchClasses"
    @submit="searchClasses"
    v-model="valid"
    class="fill-height"
  >
    <v-row align="center" justify="center">
      <v-col cols="12" md="9">
        <v-text-field
          class="rounded-pill"
          label="Search for classes"
          placeholder="(example: classes for chemistry major)"
          v-model="userInput"
          prepend-inner-icon="mdi-magnify"
          outlined
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-container v-if="showAdvanced" class="mb-8">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="3">
          <v-select
            required
            v-model="selected.term"
            :items="options.terms"
            label="Term"
            item-text="value"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-autocomplete
            clearable
            v-model="selected.gur"
            :items="options.gurs"
            label="GUR"
            item-text="value"
            item-value="code"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field label="Course Title" v-model="selected.courseTitle"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="3">
          <v-autocomplete
            clearable
            v-model="selected.other"
            :items="options.others"
            label="Other Attributes"
            item-text="value"
            item-value="code"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="3">
          <v-autocomplete
            clearable
            v-model="selected.subject"
            :items="options.subjects"
            label="Subject"
            item-text="value"
            item-value="code"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="3">
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
        <v-col cols="12" sm="3">
          <v-text-field
            label="Course Number"
            v-model="selected.coursenumber"
            :rules="[courseNumberRules]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select clearable :items = "options.remote" v-model="selected.remote" label="Remote/On-site"></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select clearable :items="options.sync" v-model="selected.synchronous" label="Sync/async"></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="3">
          <v-text-field label="Credits" v-model="selected.credits" :rules="[numberRules]"></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
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
        <v-col cols="12" sm="3">
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
      <v-row justify="center">
        <v-col cols="3">
          <v-checkbox v-model="selected.onlyOpen" label="Only Open Sections"></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center" class="d-none d-sm-flex">
      <v-spacer />
        <v-btn v-on:click="showAdvanced = !showAdvanced">
          {{ !showAdvanced ? "Advanced" : "Hide Advanced" }}
        </v-btn>
        <v-spacer />
        <a class="d-none d-sm-flex"  v-on:click="searchClasses">
          <v-btn color="primary" type="submit" to="/results">Search Classes</v-btn>
        </a>
        <v-spacer />
    </v-row>
    <v-row justify="center" class="d-flex d-sm-none">
      <v-col cols="12">
          <v-btn block v-on:click="showAdvanced = !showAdvanced">{{ !showAdvanced ? "Advanced" : "Hide Advanced" }} </v-btn>
        <a class="mt-5 d-flex d-sm-none" v-on:click="searchClasses">
          <v-btn block color="primary" type="submit" to="/results">Search</v-btn>
        </a>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { mapMutations } from 'vuex';

const selectOptions = require('../../selectOptions');
const { instructors } = require('../../fetched.json');
const util = require('../../util');
const nlp = require('./nlp');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));
export default {
  name: 'ClassForm',
  props: { showAdvanced: Boolean },
  components: {},
  data: () => ({
    options: selectOptions,
    selected: {
      instructor: undefined,
      term: 'Fall 2021',
      gurs: undefined,
      other: undefined,
      days: [],
      subject: undefined,
      site: undefined,
      coursenumber: undefined,
      remote: undefined,
      onlyOpen: false,
      credits: undefined,
      courseTitle: undefined,
    },
    valid: false,
    userInput: '',
  }),
  methods: {
    async searchClasses(e) {
      if (this.userInput === '') {
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
      } else {
        const stemmedInput = nlp.processQuery(this.userInput);
        console.log(stemmedInput);
        const data = await util.fetchClassesNLP(stemmedInput);
        this.setResults(data);
        this.setRoute('/results');
        window.history.pushState(
          null,
          'Classfinder Results',
          `/results?${stemmedInput}`,
        );
      }
    },
    courseNumberRules: (input) => {
      if (input) {
        const regex = /[0-9]{3}/;
        try {
          return regex.exec(input.trim())[0] === input;
        } catch (e) {
          return input.length === 0;
        }
      } else {
        return true;
      }
    },
    numberRules: (input) => {
      if (input) {
        const regex = /[0-9]+/;
        try {
          return regex.exec(input.trim())[0] === input;
        } catch (e) {
          return input.length === 0;
        }
      } else {
        return true;
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
