<template>
  <v-container>
    <Messages/>
    <ExampleAudioSelect/>
    <v-layout row wrap class="text-xs-center">
      <v-flex md6 xs12>
        <audio ref="audioElement" :src="audioFile" controls/>
      </v-flex>
      <v-flex md6></v-flex>
      <v-flex v-if="loading.isLoading" xs12 text-xs-center>
        <v-progress-circular indeterminate></v-progress-circular>
        <p>{{loading.message}}</p>
      </v-flex>
      <v-flex xs12>
        <TranscriptEditor :audioPlaybackTime="audioPlaybackTime" :seek="seek"/>
      </v-flex>
      <v-btn
        v-if="!showAudioInput"
        block
        flat
        outline
        color="info"
        @click="showAudioInput = !showAudioInput"
      >Prøv med egne filer eller opptak</v-btn>
      <div v-if="showAudioInput">
        <AudioRecorder/>
        <AudioFileInput/>
        <GcloudConfig/>
      </div>
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
import AudioRecorder from "@/components/AudioRecorder";

export default {
  components: {
    ExampleAudioSelect,
    TranscriptEditor,
    AudioFileInput,
    Messages,
    GcloudConfig,
    AudioRecorder
  },
  data() {
    return {
      audioPlaybackTime: 0,
      showAudioInput: false
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
