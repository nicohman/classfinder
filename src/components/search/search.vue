<template>
  <div class="fill-height">
    <v-container v-if="$vuetify.breakpoint.smAndUp" class="fill-height" fluid>
      <v-row align="center" justify="center" class="my-auto">
        <v-col cols="7">
          <v-card class="elevation-0 pb-12" style="background-color: rgb(250, 253, 255)">
            <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="fill-height" fluid>
      <ClassForm v-bind:showAdvanced="showAdvanced"></ClassForm>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import ClassForm from './form.vue';

export default {
  name: 'Search',
  components: { ClassForm },
  data: () => ({
    showAdvanced: false,
    drawer: false,
  }),
  methods: {
    goScratchSheet() {
      this.setRoute('/scratchsheet');
      window.history.pushState(null, 'Scratchsheet', '/scratchsheet');
    },
    ...mapMutations(['setRoute']),
  },
};
</script>
