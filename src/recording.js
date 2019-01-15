export const getAudioRecorder = async () => {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    const recorder = new MediaRecorder(audioStream);
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

export const processRecording = async (recorder, chunks) => {
  console.log('processRecording')
  console.log(recorder)
  try {
    const audioBlob = new Blob(chunks, {
      type: 'audio/ogg; codecs=opus'
    })
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