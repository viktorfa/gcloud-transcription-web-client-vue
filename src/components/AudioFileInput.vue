<template>
  <v-input hint="Kun .flac" persistent-hint>
    <input type="file" label="anus" accept="audio/flac" @change="handleAudioInputChange">
  </v-input>
</template>

<script>
export default {
  name: "AudioFileInput",
  methods: {
    handleAudioInputChange(event) {
      this.$store.dispatch("HANDLE_AUDIO_FILE_INPUT", {
        inputFile: event.target.files[0]
      });
    }
  }
};
</script>

<style>
</style>
