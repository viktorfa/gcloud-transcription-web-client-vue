<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-select :items="languageList" v-model="selectedLanguage"></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field v-model="gcloudApiKey" label="Your Gcloud API key"></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "GcloudConfig",
  computed: {
    ...mapState(["languageList"]),
    gcloudApiKey: {
      get() {
        return this.$store.state.gcloudApiKey;
      },
      set(newValue) {
        this.$store.commit("setGcloudApiKey", newValue);
      }
    },
    selectedLanguage: {
      get() {
        return this.$store.state.selectedLanguage;
      },
      set(newValue) {
        this.$store.commit("setSelectedLanguage", newValue);
      }
    }
  }
};
</script>

<style>
</style>
