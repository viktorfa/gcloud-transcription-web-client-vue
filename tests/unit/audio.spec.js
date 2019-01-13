import '@vue/test-utils'
import {
  readAudioFile,
} from '@/audio'

const audioFile = new Blob([''], {type: 'audio/flac'})

describe('audio.js', () => {
  it('should return a promise', () => {
    const actual = readAudioFile(audioFile)
    expect(actual).toBeInstanceOf(Promise);
  })
  it('should return an option with a string if successful', async () => {
    const {ok, data, error} = await readAudioFile(audioFile)
    expect(ok).toBeTruthy();
    expect(typeof data).toBe('string');
    expect(error).toBeFalsy();  
  })
  it('should return an option with an error if not successful', async () => {
    const {ok, data, error} = await readAudioFile('not_a_blob :D')
    expect(ok).toBeFalsy();
    expect(data).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(Object);
    expect(typeof error.message).toBe('string');
  })
})