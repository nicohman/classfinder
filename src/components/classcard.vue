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
      <v-card-text class="grow mt-4">
        <span class="headline">{{value.Title}}</span>
        <br />
        {{value.Description}}
        <br />
        <v-list color="grey lighten-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>CRN</v-list-item-subtitle>
              <v-list-item-title>{{value.CRN}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Instructor</v-list-item-subtitle>
              <v-list-item-title>{{value.Instructor}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>GUR Attributes</v-list-item-subtitle>
              <v-list-item-title>{{value.Gurs.join(",")}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Cap/Enrolled/Available</v-list-item-subtitle>
              <v-list-item-title v-html="value.CourseCount"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Credits</v-list-item-subtitle>
              <v-list-item-title>{{value.Credits}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Dates</v-list-item-subtitle>
              <v-list-item-title>{{value.StartDate}}-{{value.EndDate}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-on:click="rmClass">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-btn
          target="_blank"
          v-bind:href="`https://classfinder.nicohman.com/results?name=${value.Name}`"
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
