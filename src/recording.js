import '@/contrib/recorder'

export const getAudioRecorder = async () => {
  const audioContext = new AudioContext();
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({audio: true})
    const audioInput = audioContext.createMediaStreamSource(audioStream)
    const recorder = new window.Recorder(audioInput);
    return {
      ok: true,
      data: recorder,
    };
  } catch (error) {
    console.warn(error)
    return {
      ok: false,
      error: {
        message: 'Cannot use microphone. Please refresh.',
        error,
      }
    }
  }
}

export const processRecording = async (recorder) => {
  console.log('processRecording')
  console.log(recorder)
  try {
    const audioBlob = await getAudioBlob(recorder);
    console.log(audioBlob)
    const result = URL.createObjectURL(audioBlob)
    console.log(result)
    window.audioBlob = audioBlob
    return {
      ok: true,
      data: audioBlob
    }
  } catch (error) {
    console.warn(error)
    return {
      ok: false,
      error: {
        message: 'Could not read recorded audio',
        error
      }
    }
  }
}

const getAudioBlob = async (recorder) => new Promise((resolve) => recorder.exportWAV(resolve))