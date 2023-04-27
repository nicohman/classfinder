<template>
  <div class="fill-height">
    <v-container class="fill-height" fluid>
      <!-- mobile screen (xs screen) -->
      <v-row v-if="$vuetify.breakpoint.xs" align="center" justify="center" class="my-auto">
        <v-col cols="11">
          <v-card class="elevation-0 pb-12" style="background-color: rgb(250, 253, 255)">
            <SearchForm v-bind:showAdvanced="showAdvanced" />
          </v-card>
        </v-col>
      </v-row>
      <!-- non-mobile screen (screen sizes sm, md, and up) -->
      <v-row v-else align="center" justify="center" class="my-auto">
        <v-col cols="7">
          <v-card class="elevation-0 pb-12" style="background-color: rgb(250, 253, 255)">
            <SearchForm v-bind:showAdvanced="showAdvanced" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import SearchForm from './search-form.vue';

export default {
  name: 'SearchPage',
  components: { SearchForm },
  data: () => ({
    showAdvanced: false,
    drawer: false,
  }),
  methods: {
    goScratchSheet() {
      this.setRoute('/scratchsheet');
      window.history.pushState(null, 'Scratch Sheet', '/scratchsheet');
    },
    ...mapMutations(['setRoute']),
  },
};
</script>
