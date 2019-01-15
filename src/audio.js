export const readAudioFile = async (audioFile) => {
  let reader;
  console.log('readAudioFile')
  console.log(audioFile)
  console.log(typeof audioFile)
  try {
    reader = new FileReader();
    reader.readAsDataURL(audioFile);
  } catch (error) {
    return {
      ok: false,
      error: {
        message: error.message
      }
    }
  }
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve({
        ok: true,
        data: reader.result
      })
    };
    reader.onerror = () => {
      reject({
        ok: true,
        error: reader.error
      })
    }
  })
}