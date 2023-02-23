<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn large v-on="on">View All CRNS</v-btn>
    </template>
    <v-card>
      <v-card-title>All CRNs</v-card-title>
      <v-card-text>
        <span v-bind:key="item" v-for="item in getScratch()">
          {{ item.Name + " - " + item.CRN }}
          <br />
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllCrnsDialog',
  methods: {
    ...mapGetters(['getScratch']),
  },
};
</script>
