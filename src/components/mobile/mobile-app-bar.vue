<template>
  <v-container>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon v-on:click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title > {{ getRouteTitle() }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-on:click="goRoute('/')">
            <v-list-item-icon>
              <v-icon>mdi-calendar-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search Classes</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="goRoute('/scratchsheet')">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Scratch Sheet</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="goRoute('/information')">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item href="https://charts.mongodb.com/charts-classfinder-upefc/public/dashboards/609031cb-0c22-4ddf-8e6c-5aaeaf683b50" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-chart-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Charts
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'MobileAppBar',
  components: {},
  data: () => ({
    drawer: false,
  }),
  methods: {
    goRoute(route) {
      this.setRoute(route);
      window.history.pushState(null, this.getRouteTitle(route), route);
      this.drawer = false;
    },
    ...mapGetters(['getRouteTitle']),
    ...mapMutations(['setRoute']),
  },
};
</script>
