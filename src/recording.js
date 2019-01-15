import Recorder from '@/contrib/recorderjs';

export const getAudioRecorder = async () => {
  const audioContext = new AudioContext();
  const recorder = new Recorder(audioContext);
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    recorder.init(audioStream, {
      numChannels: 1
    })
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