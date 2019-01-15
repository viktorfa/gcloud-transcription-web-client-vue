<template>
  <v-layout>
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
            @text-change="handleTextChange"
            :editorToolbar="[]"
          />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import {
  findWordByCursorIndex,
  isEditTextEvent,
  wordIsCurrentTime,
  findWordByTime
} from "../helpers";
export default {
  name: "TranscriptEditor",
  components: {
    VueEditor
  },
  props: {
    audioPlaybackTime: Number,
    seek: Function
  },
  computed: {
    ...mapState(["editedTranscriptString"]),
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
    wordIsCurrentTime(word) {
      return wordIsCurrentTime(word, this.audioPlaybackTime);
    }
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

<style>
</style>
