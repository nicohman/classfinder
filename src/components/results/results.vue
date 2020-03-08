<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on:click="goBack" icon large v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Go Back</span>
        </v-tooltip>
        <v-toolbar-title>Classfinder</v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-card-title></v-card-title>
      <v-data-table
        v-on:click:row="popupClass(e)"
        :headers="headers"
        :items="results"
        :search="search"
        show-expand
        item-key="CRN"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <span v-html="displayExpanded(item)"></span>
          </td>
        </template>
        <template v-slot:item.TimeLocations="{header, value}">
          <span v-html="displayTimeLocation(value)"></span>
        </template>
        <template v-slot:item.Available="{header, value}">
          <span v-html="displayAvailable(value)"></span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Results',
  props: { results: Array },
  data: () => ({
    headers: [
      { text: 'Class Code', value: 'Name' },
      { text: 'CRN', value: 'CRN' },
      { text: 'Name', value: 'Title' },
      { text: 'Cap', value: 'Capacity' },
      { text: 'Enrolled', value: 'Enrolled' },
      { text: 'Available', value: 'Available' },
      { text: 'Instructor', value: 'Instructor' },
      { text: 'GUR Attributes', value: 'GUR' },
      { text: 'Classes', value: 'TimeLocations' },
    ],
    search: '',
  }),
  methods: {
    displayTimeLocation(timeLocs) {
      const strings = timeLocs.map(
        (i) => `${i.location}: ${i.days.join('')} ${i.startTime}-${i.endTime}`,
      );
      return strings.join('<br></br>');
    },
    displayAvailable(available) {
      let string = `${available}`;
      if (available <= 0) {
        string = `<span style="color:red">${available}</span>`;
      }
      return string;
    },
    popupClass(e) {
      console.log(e);
    },
    displayExpanded(item) {
      return `<strong>Credits</strong>: ${item.Credits}<br></br><strong>Dates</strong>: ${item.StartDate}-${item.EndDate}<br></br><strong>Description</strong>: ${item.Description}`;
    },
    goBack() {
      window.history.back();
    },
  },
  computed: {
    processed() {
      return this.results.map((r) => ({
        NameGUR: `${r.Name}<br>${r.GUR || ''}`,
        TitleCRN: `${r.Title}${r.CRN || ''}`,
      }));
    },
  },
};
</script>
