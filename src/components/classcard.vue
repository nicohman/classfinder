<template>
  <v-dialog v-model="toShow" v-bind:fullscreen="fullscreen">
    <v-card color="grey lighten-4" flat v-if="value" class="d-flex flex-column">
      <v-toolbar class="shrink" dark color="primary">
        <v-toolbar-title>{{value.Name}}</v-toolbar-title>
        <v-spacer />
        <v-btn right icon v-on:click="$emit('input', undefined)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grow">
        <v-subheader>{{value.Title}}</v-subheader>
        <br />
      {{value.Description}} <br />
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-on:click="rmClass">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-btn
          target="_blank"
          v-bind:href="`https://classfinder.demenses.net/results?name=${value.Name}`"
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
      this.rmScratch(this.value);
      this.$emit('input', undefined);
    },
    ...mapGetters(['getScratch', 'getScratchClassByCRN']),
    ...mapMutations(['rmScratch']),
  },
};
</script>
