<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn large v-on="on">View All CRNS</v-btn>
    </template>
    <v-card>
      <v-card-title>All CRNs</v-card-title>
      <v-card-text>
        <span v-if="scratchSheetEmpty">No classes in scratch sheet</span>
        <span v-else :key="item.CRN" v-for="item in getScratch()">
          {{ `${item.Name} (${item.Title}) - ${item.CRN}` }}
          <br />
        </span>
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
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    scratchSheetEmpty() {
      return (this.getScratch()).length === 0;
    },
  },
  methods: {
    ...mapGetters(['getScratch']),
  },
  // created() {
  //   console.log(this.getScratch());
  // },
};
</script>
