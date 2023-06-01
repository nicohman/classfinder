<template>
  <v-dialog v-model="toShow" v-bind:fullscreen="fullscreen">
    <v-card color="grey lighten-4" flat v-if="value" class="d-flex flex-column">
      <v-toolbar class="shrink" dark color="primary">
        <v-toolbar-title>{{value.name}}</v-toolbar-title>
        <v-spacer />
        <v-btn right icon v-on:click="$emit('input', undefined)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>{{value.title}}</v-card-title>
      <v-card-text class="grow">
        <div class="classDesc">{{value.Description.description}}</div>
        <v-list color="grey lighten-4" class="px-0">
          <v-list-item v-for="attr, idx in attributes" :key="idx" class="px-0">
            <v-list-item-content>
              <v-list-item-title>{{attr.text}}</v-list-item-title>
              <v-list-item-subtitle
                v-if="attr.isHtml"
                v-html="attr.val"
              ></v-list-item-subtitle>
              <v-list-item-subtitle v-else>{{attr.val}}</v-list-item-subtitle>
              <!-- <v-list-item-subtitle>{{attr.text}}</v-list-item-subtitle>
              <div v-if="attr.isHtml" v-html="attr.val"></div>
              <div v-else>{{attr.val}}</div> -->
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
          v-bind:href="`https://classfinder.nicohman.com/results?name=${value.name}&term=${value.term}`"
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
      return [
        {
          text: 'CRN',
          val: this.value.crn,
        },
        {
          text: 'Instructor',
          val: this.value.instructor,
        },
        {
          text: 'GUR Attributes',
          val: this.value.gurs.join(',') || 'None',
        },
        {
          text: 'Cap/Enrolled/Available',
          val: this.value.course_count,
          isHtml: true,
        },
        {
          text: 'Credits',
          val: this.value.credits,
        },
        {
          text: 'Date Range',
          val: `${this.value.start_date} - ${this.value.end_date}`,
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
