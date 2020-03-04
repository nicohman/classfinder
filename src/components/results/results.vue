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
        <td :colspan="headers.length">{{item.Time}}</td>
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
    ],
    search: '',
  }),
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
