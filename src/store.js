import Vue from 'vue'
import Vuex from 'vuex'

import exampleAudioFile from "./assets/esop-oslo-øst.flac";
import exampleGcloudData from "./assets/gcloud-response.json";

import {
  defaultLanguage,
} from './config/vars'
import {
  languageList
} from './constants'
import {
  annotateWords,
} from "./helpers";

import {
  readAudioFile,
} from "./audio";
import {
  audioSpeechToText,
} from "./api/gcloud";

Vue.use(Vuex)

const defaultLoading = {
  isLoading: false,
  message: '',
  progress: null,
}

const initialState = {
  audioFile: exampleAudioFile,
  encodedInputAudio: '',
  gcloudData: exampleGcloudData,
  editedTranscriptString: exampleGcloudData.results[0].alternatives[0].transcript,
  selectedLanguage: defaultLanguage,
  languageList,
  messages: [],
  loading: defaultLoading,
}

const transcriptionMutations = {
  setAudioFile: 'setAudioFile',
  setEncodedInputAudio: 'setEncodedInputAudio',
  setGcloudData: 'setGcloudData',
  setSelectedLanguage: 'setSelectedLanguage',
  setEditedTranscriptString: 'setEditedTranscriptString',
  addMessage: 'addMessage',
  removeMessage: 'removeMessage',
  setLoading: 'setLoading',
}

const mutations = {
  [transcriptionMutations.setAudioFile](state, audioFile) {
    state.audioFile = audioFile;
  },
  [transcriptionMutations.setEncodedInputAudio](state, encodedInputAudio) {
    state.encodedInputAudio = encodedInputAudio;
  },
  [transcriptionMutations.setGcloudData](state, gcloudData) {
    state.gcloudData = gcloudData;
  },
  [transcriptionMutations.setSelectedLanguage](state, selectedLanguage) {
    state.selectedLanguage = selectedLanguage;
  },
  [transcriptionMutations.setEditedTranscriptString](state, editedTranscriptString) {
    state.editedTranscriptString = editedTranscriptString;
  },
  [transcriptionMutations.addMessage](state, message) {
    state.messages = [...state.messages, message]
  },
  [transcriptionMutations.removeMessage](state, i) {
    state.messages = [...state.messages.splice(i, 1)];
  },
  [transcriptionMutations.setLoading](state, loading) {
    if (!loading) {
      state.loading = defaultLoading;
    } else {
      state.loading = loading;
    }
  },
}
const transcriptionActions = {
  HANDLE_AUDIO_FILE_INPUT: 'HANDLE_AUDIO_FILE_INPUT',
  SEND_GCLOUD_REQUEST: 'SEND_GCLOUD_REQUEST',
}
const actions = {
  async [transcriptionActions.HANDLE_AUDIO_FILE_INPUT]({
    dispatch,
    commit,
  }, {
    inputFilePath
  }) {
    commit(transcriptionMutations.setLoading, {
      isLoading: true,
      message: 'leser lydfil',
    });
    const {
      ok,
      data,
      error
    } = await readAudioFile(inputFilePath)
    if (ok) {
      commit(transcriptionMutations.setEncodedInputAudio, data)
      commit(transcriptionMutations.setAudioFile, data)
      dispatch(transcriptionActions.SEND_GCLOUD_REQUEST)
    } else {
      commit(transcriptionMutations.addMessage, error)
    }
  },
  async [transcriptionActions.SEND_GCLOUD_REQUEST]({
    commit,
    state,
  }) {
    commit(transcriptionMutations.setLoading, {
      isLoading: true,
      message: 'transkriberer tale',
    });
    const audio = {
      content: state.encodedInputAudio.substring(state.encodedInputAudio.indexOf(",") + 1)
    };
    const config = {
      encoding: "flac"
    };
    const {
      ok,
      data,
      error,
    } = await audioSpeechToText(audio, config);
    if (ok) {
      commit(transcriptionMutations.setGcloudData, data);
      commit(transcriptionMutations.setEditedTranscriptString, data.results[0].alternatives[0].transcript);
      commit(transcriptionMutations.addMessage, {
        message: 'Teksten er klar'
      });
    } else {
      commit(transcriptionMutations.addMessage, error);
    }
    commit(transcriptionMutations.setLoading);
  },
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    annotatedWords: state => annotateWords(state.gcloudData.results[0].alternatives[0].words),
    transcriptString: state => state.gcloudData.results[0].alternatives[0].transcript,
  },
  mutations,
  actions,
})