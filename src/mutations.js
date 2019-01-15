const defaultLoading = {
  isLoading: false,
  message: '',
  progress: null,
}

const getSetterMutation = (fieldName) => (state, newValue) => {
  state[fieldName] = newValue
};

export const transcriptionMutations = {
  setAudioFile: 'setAudioFile',
  setEncodedInputAudio: 'setEncodedInputAudio',
  setGcloudData: 'setGcloudData',
  setEditedTranscriptString: 'setEditedTranscriptString',
  addMessage: 'addMessage',
  removeMessage: 'removeMessage',
  setLoading: 'setLoading',
  setSelectedAudio: 'setSelectedAudio',
}
export const ioMutations = {
  addAudioOption: 'addAudioOption',
}
export const configMutations = {
  setSelectedLanguage: 'setSelectedLanguage',
  setGcloudApiKey: 'setGcloudApiKey',
}

export const mutations = {
  [transcriptionMutations.setAudioFile]: getSetterMutation('audioFile'),
  [transcriptionMutations.setSelectedAudio]: getSetterMutation('selectedAudio'),
  [configMutations.setGcloudApiKey]: getSetterMutation('gcloudApiKey'),
  [transcriptionMutations.setEncodedInputAudio](state, encodedInputAudio) {
    state.encodedInputAudio = encodedInputAudio;
  },
  [transcriptionMutations.setGcloudData](state, gcloudData) {
    state.gcloudData = gcloudData;
  },
  [configMutations.setSelectedLanguage]: getSetterMutation('selectedLanguage'),
  [transcriptionMutations.setEditedTranscriptString](state, editedTranscriptString) {
    state.editedTranscriptString = editedTranscriptString;
  },
  [transcriptionMutations.addMessage](state, message) {
    state.messages = [...state.messages, message]
  },
  [ioMutations.addAudioOption](state, audioOption) {
    state.messages = [...state.exampleAudioOptions, audioOption]
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