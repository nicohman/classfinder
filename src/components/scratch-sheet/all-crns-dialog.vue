<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn large v-on="on">View All CRNS</v-btn>
    </template>
    <v-card>
      <v-card-title>All CRNs</v-card-title>
      <v-card-text>
        <div v-if="!term" justify="center">
          No term selected
        </div>
        <div v-else-if="sheetEmptyForTerm" justify="center" >
          Your scratch sheet for {{term}} has no classes with times
        </div>
        <div v-else v-for="item in classesSet" :key="item.CRN">
          {{ `${item.Name} (${item.Title}) - ${item.CRN}` }}
          <br />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllCrnsDialog',
  props: { term: String, sheetEmptyForTerm: Boolean, classesSet: Array },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapGetters(['getScratch']),
  },
};
</script>
