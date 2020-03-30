<template>
  <v-dialog v-model="toShow" fullscreen>
    <v-card color="grey lighten-4" flat v-if="value" class="d-flex flex-column">
      <v-toolbar class="shrink" dark color="primary">
        <v-toolbar-title>{{value.name}}</v-toolbar-title>
        <v-spacer />
        <v-btn right icon v-on:click="value = undefined">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grow"><br />
      {{value.description}} <br />
      {{value.startDate.toTimeString().substr(0, 5)}}-{{value.endDate.toTimeString().substr(0, 5)}}
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-on:click="rmClass">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-btn
          target="_blank"
          v-bind:href="`https://classfinder.demenses.net/results?name=${value.name}`"
        >Find other times</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ClassCard',
  props: {
    value: Object,
    fullscreen: Boolean,
  },
  computed: {
    toShow() {
      return !!this.value;
    },
  },
  methods: {
    rmClass() {
      const gotClass = this.getScratch().filter(
        (i) => i.CRN === this.value.CRN,
      )[0];
      this.value = undefined;
      this.rmScratch(gotClass);
    },
    ...mapGetters(['getScratch', 'getScratchClassByCRN']),
    ...mapMutations(['rmScratch']),
  },
};
</script>
