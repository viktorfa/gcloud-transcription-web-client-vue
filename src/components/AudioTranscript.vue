<template>
  <v-container>
    <Messages/>
    <ExampleAudioSelect/>
    <GcloudConfig/>
    <v-layout row wrap class="text-xs-center">
      <v-flex md6>
        <audio ref="audioElement" :src="audioFile" controls/>
      </v-flex>
      <v-flex md6>
        <AudioFileInput/>
      </v-flex>
      <v-flex v-if="loading.isLoading" xs12 text-xs-center>
        <v-progress-circular indeterminate></v-progress-circular>
        <p>{{loading.message}}</p>
      </v-flex>
      <v-layout row wrap>
        <TranscriptEditor :audioPlaybackTime="audioPlaybackTime" :seek="seek"/>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ExampleAudioSelect from "@/components/ExampleAudioSelect";
import TranscriptEditor from "@/components/TranscriptEditor";
import AudioFileInput from "@/components/AudioFileInput";
import Messages from "@/components/Messages";
import GcloudConfig from "@/components/GcloudConfig";

export default {
  components: {
    ExampleAudioSelect,
    TranscriptEditor,
    AudioFileInput,
    Messages,
    GcloudConfig
  },
  data() {
    return {
      audioPlaybackTime: 0
    };
  },
  computed: {
    ...mapState([
      "audioFile",
      "gcloudData",
      "editedTranscriptString",
      "selectedLanguage",
      "loading"
    ])
  },
  methods: {
    handleCloseMessage(i) {
      this.$store.commit("removeMessage", i);
    },
    seek(time) {
      this.$refs.audioElement.currentTime = time;
    }
  },
  mounted() {
    this.playbackPollInterval = setInterval(() => {
      this.audioPlaybackTime = this.$refs.audioElement.currentTime;
    }, 90);
  },
  beforeDestroy() {
    clearInterval(this.playbackPollInterval);
  }
};
</script>
