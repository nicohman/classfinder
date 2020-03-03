<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-form ref="form">
              <v-row align="center" justify="center">
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="selected.term"
                    :items="options.terms"
                    label="Term"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="7">
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
                <v-col cols="12" sm="10">
                  <v-select
                    v-model="selected.other"
                    :items="options.others"
                    label="Other Attributes"
                    item-text="value"
                    item-value="code"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="10"></v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="10"></v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    options: {
      terms: [{ code: '202020', value: 'Spring 2020' }],
      gurs: [
        { code: 'All', value: 'All GUR/Non-GUR Courses' },
        { code: 'ACOM', value: 'ACOM - A-Communication GUR' },
        { code: 'ACGM', value: 'ACGM - A-Comparative Gender GUR' },
        { code: 'BCOM', value: 'BCOM - B-Communication GUR' },
        { code: 'BCGM', value: 'BCGM - B-Comparative Gender GUR' },
        { code: 'CCOM', value: 'CCOM - C-Communication GUR' },
        { code: 'HUM', value: 'HUM - Humanities GUR' },
        { code: 'LSCI', value: 'LSCI - Nat Sci with Lab Component GUR' },
        { code: 'SCI', value: 'SCI - Natural Science GUR' },
        { code: 'QSR', value: 'QSR - Quantitative & Symbolic Reasoning GUR' },
        { code: 'SSC', value: 'SSC - Social Sciences GUR' },
      ],
      others: [
        { code: 'All', value: 'All Courses With/Without Other Attributes' },
        { code: 'AFME', value: 'AFME - HistFieldReq-Africa & Mid East' },
        { code: 'ANCT', value: 'ANCT - HistFieldReq-Ancient' },
        { code: 'ASIA', value: 'ASIA - HistFieldReq-East & South Asia' },
        { code: 'CF', value: 'CF - Communication Focus' },
        { code: 'CF-E', value: 'CF-E - Communication Focus-Economics' },
        { code: 'CMB1', value: 'CMB1 - HistFieldReq-CombReq600-1450CE' },
        { code: 'CMB2', value: 'CMB2 - HistFieldReq-CombReqSince1450' },
        { code: 'CPST', value: 'CPST - Capstone Course' },
        { code: 'EUR', value: 'EUR - HistFieldReq-Europe' },
        { code: 'EUR1', value: 'EUR1 - HistFieldReq-Europe 600-1450CE' },
        { code: 'EUR2', value: 'EUR2 - HistFieldReq-EuropeSince1450CE' },
        { code: 'FIG', value: 'FIG - FIG First Yr Interest Seminar' },
        { code: 'FYE', value: 'FYE - First Year Experience' },
        { code: 'OL', value: 'OL - Online' },
        { code: 'SL', value: 'SL - Service Learning' },
        { code: 'TRVL', value: 'TRVL - Faculty Led Travel' },
        { code: 'US', value: 'US - HistFieldReq-United States' },
        { code: 'US1', value: 'US1 - HistFieldReq-US before 1865' },
        { code: 'US2', value: 'US2 - HistFieldReq-US since 1865' },
        { code: 'WHEM', value: 'WHEM - HistFieldReq-Wstrn Hemisphere' },
        { code: 'WP1', value: 'WP1 - Writing Proficiency 1 point' },
        { code: 'WP2', value: 'WP2 - Writing Proficiency 2 points' },
        { code: 'WP3', value: 'WP3 - Writing Proficiency 3 points' },
      ],
    },
    selected: {
      term: '',
      gurs: '',
      other: '',
    },
  }),
};
</script>
