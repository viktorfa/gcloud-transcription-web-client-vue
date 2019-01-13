export const readAudioFile = (audioFile) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(audioFile);
    reader.onloadend = () => {
      resolve({
        ok: true,
        data: reader.result,
      })
    }
    reader.onerror = () => {
      reject({
        ok: false,
        error: reader.error,
      });

    }
  })
}