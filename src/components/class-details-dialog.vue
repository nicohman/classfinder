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
          <v-list-item v-for="attr, idx in attributes" :key="idx">
            <v-list-item-content>
              <v-list-item-subtitle>{{attr.text}}</v-list-item-subtitle>
              <v-list-item-title v-if="!(attr.isHtml)">{{attr.val}}</v-list-item-title>
              <v-list-item-title v-else v-html="attr.val"></v-list-item-title>
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
          v-bind:href="`https://classfinder.nicohman.com/results?name=${value.Name}&term=${value.Term}`"
        >Find other times</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ClassDetailsDialog',
  props: {
    value: Object,
    fullscreen: Boolean,
  },
  computed: {
    toShow() {
      return !!this.value;
    },
    attributes() {
      console.log('attrs test: ', this.value.CRN, this.value.Gurs.join(','));
      return [
        {
          text: 'CRN',
          val: this.value.CRN,
        },
        {
          text: 'Instructor',
          val: this.value.Instructor,
        },
        {
          text: 'GUR Attributes',
          val: this.value.Gurs.join(','),
        },
        {
          text: 'Cap/Enrolled/Available',
          val: this.value.CourseCount,
          isHtml: true,
        },
        {
          text: 'Credits',
          val: this.value.Credits,
        },
        {
          text: 'Date Range',
          val: `${this.value.StartDate} - ${this.value.EndDate}`,
        },
      ];
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
