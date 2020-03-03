<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-form ref="form">
              <v-row align="center" justify="center">
                <v-col cols="12" sm="3">
                </v-col>
                <v-col cols="12" sm="7">
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="10">
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="10">
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="10">
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
