const apiUrl = 'https://speech.googleapis.com/v1/speech:recognize'

import {
  gcloudApiKey,
  defaultLanguage,
} from '../config/vars'

const defaultConfig = {
  languageCode: defaultLanguage,
  enableWordTimeOffsets: true,
  sampleRateHertz: 44100,
}

export const audioSpeechToText = async (audio, config) => {
  try {
    if (!audio) throw {
      msg: 'No audio input',
    }
    const options = {
      body: JSON.stringify({
        audio,
        config: {
          ...defaultConfig,
          ...config,
        },
      }),
      method: 'POST',
    }
    const response = await fetch(`${apiUrl}?key=${gcloudApiKey}`, options)
    if (response.ok) {
      return {
        ok: true,
        data: await response.json(),
      }
    } else {
      throw {
        response
      }
    }
  } catch (error) {
    return {
      ok: false,
      error,
    }
  }
}