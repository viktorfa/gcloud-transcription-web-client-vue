import Vue from 'vue'
import Vuex from 'vuex'

import exampleAudioFile from "@/assets/esop-oslo-øst.flac";
import exampleGcloudData from "@/assets/esop-oslo-øst-response.json";

import exampleAudioOptions from '@/exampleAudio'

import {
  defaultLanguage,
  gcloudApiKey,
} from './config/vars'
import {
  languageList
} from './constants'
import {
  annotateWords,
} from "./helpers";

import {
  actions
} from './actions'
import {
  mutations
} from './mutations'

Vue.use(Vuex)

const defaultLoading = {
  isLoading: false,
  message: '',
  progress: null,
}

const initialLanguage = languageList.find(({
  value
}) => value === defaultLanguage) || languageList.find(({
  value
}) => value === 'en-US')

const initialState = {
  audioFile: exampleAudioFile,
  encodedInputAudio: '',
  gcloudData: exampleGcloudData,
  editedTranscriptString: exampleGcloudData.results[0].alternatives[0].transcript,
  selectedLanguage: initialLanguage,
  languageList,
  messages: [],
  loading: defaultLoading,
  exampleAudioOptions,
  selectedAudio: exampleAudioOptions[0],
  gcloudApiKey,
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