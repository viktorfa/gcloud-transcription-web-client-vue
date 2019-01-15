const apiUrl = 'https://speech.googleapis.com/v1p1beta1/speech:recognize'

import {
  gcloudApiKey,
  defaultLanguage,
} from '../config/vars'

const defaultConfig = {
  languageCode: defaultLanguage,
  enableAutomaticPunctuation: true,
  model: 'default',
  enableWordTimeOffsets: true,
  sampleRateHertz: 44100,
}

export const audioSpeechToText = async (audio, config, apiKey = gcloudApiKey) => {
  try {
    if (!audio) throw {
      message: 'No audio input',
    }
    if (!apiKey) throw {
      message: 'Need Gcloud API key',
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
    const response = await fetch(`${apiUrl}?key=${apiKey}`, options)
    if (response.ok) {
      const data = await response.json();
      if (data && data.results) {
        return {
          ok: true,
          data,
        }
      }
      return {
        ok: false,
        error: {
          message: 'No response data'
        }
      }
    }
    return {
      ok: false,
      error: {
        message: response.status
      }
    }
  } catch (error) {
    return {
      ok: false,
      error,
    }
  }
}