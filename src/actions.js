import {
  readAudioFile,
} from "./audio";
import {
  audioSpeechToText,
} from "./api/gcloud";

import {
  transcriptionMutations
} from './mutations'

export const transcriptionActions = {
  HANDLE_AUDIO_FILE_INPUT: 'HANDLE_AUDIO_FILE_INPUT',
  SEND_GCLOUD_REQUEST: 'SEND_GCLOUD_REQUEST',
  SET_EXAMPLE_AUDIO: 'SET_EXAMPLE_AUDIO',
  READ_AUDIO_FILE: 'READ_AUDIO_FILE',
}
export const actions = {
  async [transcriptionActions.HANDLE_AUDIO_FILE_INPUT]({
    dispatch,
    commit,
  }, {
    inputFile
  }) {
    commit(transcriptionMutations.setLoading, {
      isLoading: true,
      message: 'leser lydfil',
    });
    const {
      ok,
      data,
      error
    } = await readAudioFile(inputFile)
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
  async [transcriptionActions.SET_EXAMPLE_AUDIO]({
    commit,
    state,
  }, {
    index
  }) {
    console.log('transcriptionActions.SET_EXAMPLE_AUDIO')
    const {
      name,
      audioFile,
      gcloudResponse,
      id,
    } = state.exampleAudioOptions[index];
    commit(transcriptionMutations.setEditedTranscriptString, gcloudResponse.results[0].alternatives[0].transcript);
    commit(transcriptionMutations.setSelectedAudio, {
      name,
      audioFile,
      gcloudResponse,
      id,
    });
    commit(transcriptionMutations.setAudioFile, audioFile)
    commit(transcriptionMutations.setGcloudData, gcloudResponse)

  },
  async [transcriptionActions.READ_AUDIO_FILE]({
    commit
  }, {
    inputFile
  }) {
    console.log('transcriptionActions.READ_AUDIO_FILE')
    commit(transcriptionMutations.setLoading, {
      isLoading: true,
      message: 'leser lydfil',
    });
    console.log('inputFile')
    console.log(inputFile)
    console.log(typeof inputFile)
    const {
      ok,
      data,
      error
    } = await readAudioFile(inputFile)
    if (ok) {
      commit(transcriptionMutations.setEncodedInputAudio, data)
      commit(transcriptionMutations.setAudioFile, data)
    } else {
      commit(transcriptionMutations.addMessage, error)
    }
  },
}