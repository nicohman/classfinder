<template>
  <v-dialog v-model="showDialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn dark v-on="on" icon large>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Information</v-card-title>
      <v-card-text>
        <br />This is an alternative to WWU's
        <a
          href="https://admin.wwu.edu/pls/wwis/wwsktime.SelClass"
          target="_blank"
        >ClassFinder</a> website.
        For an outline of how it works, you can look at the
        <a href="https://man.sr.ht/~nicohman/classfinder" target="_blank">WIP Docs</a>.
        This is still in an alpha stage, and many planned features are not present yet or are limited in their scope.
        The source code is available in a
        <a href="https://git.sr.ht/~nicohman/classfinder" target="_blank">public repo</a> if you want to check it out.
        If you have bug reports or feature sugestions, you can file an issue on
        <a href="https://github.com/nicohman/classfinder" target="_blank">GitHub</a>.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="showDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'InfoDialog',
  components: {},
  data() {
    return {
      showDialog: false,
    };
  },
};
</script>
