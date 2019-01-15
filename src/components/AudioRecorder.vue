<template>
  <v-layout row wrap>
    <h1>Audio recorder</h1>
    <v-flex xs12>
      <v-btn v-show="!recorder" @click.native="initalizeRecording" block round color="success" dark>
        <v-icon left>mic</v-icon>Klikk hvis du vil prøve lydopptak
      </v-btn>
      <v-btn
        v-show="showStartRecording && recorder"
        @click.native="startRecording"
        block
        round
        color="primary"
        dark
      >
        <v-icon left>mic</v-icon>Start lydopptak
      </v-btn>
      <v-btn
        v-show="showStopRecording"
        @click.native="stopRecording"
        block
        round
        color="error"
        dark
      >
        <v-icon left>stop</v-icon>Stopp lydopptak
      </v-btn>
      <v-btn v-show="recorder" @click.native="processRecording" block round color="success" dark>
        <v-icon left>note</v-icon>Transkriber lydopptak
      </v-btn>
      <br>
    </v-flex>
  </v-layout>
</template>

<script>
import { getAudioRecorder, processRecording } from "@/recording";
import { setTimeout, clearInterval } from "timers";

let interval;
let timer;
let myRecorder;
let chunks = [];
export default {
  name: "AudioRecorder",
  data() {
    return {
      showStartRecording: true,
      showStopRecording: false,
      isRecording: false,
      recorder: null,
      recordingTimer: 30000
    };
  },
  methods: {
    async initalizeRecording() {
      const { ok, error, data: recorder } = await getAudioRecorder();
      if (ok) {
        this.recorder = recorder;
        myRecorder = recorder;
        myRecorder.ondataavailable = event => {
          console.log("data available");
          chunks.push(event.data);
        };
      } else {
        alert(error.message);
      }
    },
    startRecording() {
      myRecorder.start();
      this.showStartRecording = false;
      this.showStopRecording = true;
      this.startRecordingTimer();
    },
    stopRecording() {
      clearInterval(timer, interval);
      myRecorder.stop();
      this.showStartRecording = true;
      this.showStopRecording = false;
    },
    async processRecording() {
      const { ok, data, error } = await processRecording(myRecorder, chunks);
      chunks = [];
      if (ok) {
        this.$store.dispatch("HANDLE_RECORDING_INPUT", { audioBlob: data });
      } else {
        alert(error.message);
      }
    },
    startRecordingTimer() {
      this.recordingTimer = 30000;
      timer = setTimeout(this.stopRecording, 30000);
      interval = setInterval(() => {
        this.recordingTimer -= 1000;
      }, 1000);
    }
  }
};
</script>

<style>
</style>
