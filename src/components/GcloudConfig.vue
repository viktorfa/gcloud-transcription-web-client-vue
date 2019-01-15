<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete :items="languageList" v-model="selectedLanguage" label="Språk på lydopptak"></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        :rules="gcloudApiKeyInputRules"
        v-model="gcloudApiKey"
        label="Your Gcloud API key"
      />
      <p class="text-xs-left" v-if="showGcloudApiKeyHint"><a href="https://github.com/viktorfa/gcloud-transcription-web-client-vue">Instructions here</a></p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "GcloudConfig",
  data() {
    const vm = this;
    return {
      gcloudApiKeyInputRules: [
        function(input) {
          const isValid = !!input;
          console.log(input);
          console.log(isValid);
          if (!isValid) {
            vm.showGcloudApiKeyHint = true;
          }
          return isValid || "You need this to transcribe your own audio";
        }
      ],
    };
  },
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
        this.$store.commit(
          "setSelectedLanguage",
          this.languageList.find(({ value }) => value === newValue)
        );
      }
    },
    showGcloudApiKeyHint() {
      return !this.gcloudApiKey;
    },
  }
};
</script>

<style>
</style>
