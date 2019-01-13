<template>
  <v-container>
    <v-snackbar :value="true" v-for="(message, i) in messages" :key="i" bottom>
      {{message}}
      <v-btn color="pink" flat @click="handleCloseMessage(i)" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-layout row wrap class="text-xs-center">
      <v-flex md6>
        <audio ref="audioElement" :src="audioFile" controls/>
      </v-flex>
      <v-flex md6>
        <input type="file" accept="audio/flac" @change="handleAudioInputChange">
      </v-flex>
      <v-flex v-if="loading.isLoading" xs12 text-xs-center>
        <v-progress-circular indeterminate></v-progress-circular>
        <p>{{loading.message}}</p>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <div>
            <h3>{{audioPlaybackTime.toFixed(2)}}</h3>
            <div style="overflow-wrap: break-word;">
              <span
                v-for="(word, i) in annotatedWords"
                :key="i"
                @click="() => seek(parseFloat(word.startTime))"
              >
                <mark v-if="wordIsCurrentTime(word)">{{word.word}}</mark>
                <span v-else>{{word.word}}</span>
                <span>&nbsp;</span>
              </span>
            </div>
            <div>
              <vue-editor
                id="transcript-textarea"
                v-model="editedTranscriptString"
                ref="editor"
                @selection-change="handleSelectionChange"
                @text-change="handleTextChange"
                :editorToolbar="[]"
              />
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { VueEditor, Quill } from "vue2-editor";

import {
  findWordByCursorIndex,
  isEditTextEvent,
  wordIsCurrentTime,
  findWordByTime
} from "../helpers";

export default {
  components: {
    VueEditor
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
      "languageList",
      "messages",
      "loading"
    ]),
    ...mapGetters(["annotatedWords", "transcriptString"]),
    editedTranscriptString: {
      get() {
        return this.$store.state.editedTranscriptString;
      },
      set(newValue) {
        this.$store.commit("setEditedTranscriptString", newValue);
      }
    }
  },
  methods: {
    handleAudioInputChange(event) {
      this.$store.dispatch("HANDLE_AUDIO_FILE_INPUT", {
        inputFilePath: event.target.files[0]
      });
    },
    handleTextChange({ ops }) {
      if (isEditTextEvent(ops)) {
        const cursorIndex = ops[0].retain;
        const annotatedWord = findWordByCursorIndex(
          cursorIndex,
          this.annotatedWords
        );
        this.seek(parseFloat(annotatedWord.startTime) - 0.5);
      }
    },
    handleSelectionChange(event) {
      if (event && event.index) {
        const annotatedWord = findWordByCursorIndex(
          event.index,
          this.annotatedWords
        );
        //this.skip(parseFloat(annotatedWord.startTime) - 0.5);
      }
    },
    handleCloseMessage(i) {
      this.$store.commit("removeMessage", i);
    },
    seek(time) {
      this.$refs.audioElement.currentTime = time;
    },
    wordIsCurrentTime(word) {
      return wordIsCurrentTime(word, this.audioPlaybackTime);
    }
  },
  mounted() {
    this.playbackPollInterval = setInterval(() => {
      this.audioPlaybackTime = this.$refs.audioElement.currentTime;
    }, 90);
  },
  beforeDestroy() {
    clearInterval(this.playbackPollInterval);
  },
  watch: {
    audioPlaybackTime(newValue) {
      const annotatedWord = findWordByTime(newValue, this.annotatedWords);
      this.$refs.editor.quill.removeFormat(0, this.transcriptString.length);
      this.$refs.editor.quill.formatText(
        annotatedWord.startIndex,
        annotatedWord.word.length,
        "background",
        "yellow"
      );
    }
  }
};
</script>
