export const readAudioFile = async (audioFile) => {
  let reader;
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