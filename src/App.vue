<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-form ref="form">
              <v-row align="center" justify="center">
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.term"
                    :items="options.terms"
                    label="Term"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.gur"
                    :items="options.gurs"
                    label="GUR"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.other"
                    :items="options.others"
                    label="Other Attributes"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.subject"
                    :items="options.subjects"
                    label="Subject"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.instructor"
                    :items="options.instructors"
                    label="Instructors"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.site"
                    :items="options.sites"
                    label="Site"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="selected.days"
                    :items="options.days"
                    label="Days"
                    item-text="value"
                    item-value="code"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// const axios = require('axios');
const selectOptions = require('./selectOptions');

export default {
  name: 'App',

  components: {},

  data: () => {
    /* let instructors = await axios.get(
      'classfinder.demenses.net/getInstructors',
    );
    instructors = JSON.parse(instructors).map((i) => ({ value: i, code: i })); */
    const instructors = [{ code: 'h', value: 'h' }];
    selectOptions.instructors = instructors;
    return {
      options: selectOptions,
      selected: {
        instructor: '',
        term: '',
        gurs: '',
        other: '',
        days: [],
        subject: '',
        site: '',
      },
    };
  },
};
</script>
