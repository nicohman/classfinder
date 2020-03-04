<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <Form></Form>
    </v-content>
  </v-app>
</template>

<script>
const Form = require('./components/form/form.vue').default;

const selectOptions = require('./selectOptions');
const { instructors } = require('./fetched.json');

selectOptions.instructors = instructors
  .sort()
  .map((i) => ({ value: i, code: i }));

export default {
  name: 'App',
  components: { Form },
  data: () => ({
  }),
};
</script>
