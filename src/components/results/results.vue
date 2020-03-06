<template>
  <v-container>
    <v-card>
      <v-card-title>
        Search Results
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="results" :search="search" show-expand item-key="CRN">
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">{{displayTimeLocation(item.TimeLocations)}}</td>
        </template>
        <template v-slot:item.TimeLocations="{header, value}" >
          <span v-html="displayTimeLocation(value)"></span>
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
      { text: 'GUR Attributes', value: 'Attribute' },
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
