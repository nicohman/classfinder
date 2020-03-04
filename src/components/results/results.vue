<template>
    <v-container>
        <v-data-table :headers="headers" :items="results"></v-data-table>
    </v-container>
</template>
<script>
export default {
  name: 'Results',
  props: { results: Object },
  data: () => ({
    headers: [{ text: 'Name', value: 'Name' }],
  }),
};
</script>
