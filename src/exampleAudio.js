import esopOsloAudio from './assets/esop-oslo-øst.flac'
import esopOsloResponse from './assets/esop-oslo-øst-response.json'
import esopStavangerAudio from './assets/esop-stavanger.flac'
import esopStavangerResponse from './assets/esop-stavanger-response.json'
import esopBergenAudio from './assets/esop-bergen.flac'
import esopBergenResponse from './assets/esop-bergen-response.json'
import tørnquistJanthomasAudio from './assets/tørnquist-janthomas-sample.flac'
import tørnquistJanthomasResponse from './assets/tørnquist-janthomas-response.json'
import språkteigenAudio from './assets/spraakteigen-sample.flac'
import språkteigenResponse from './assets/spraakteigen-response.json'

export default [{
    name: 'Sola og Nordavinden Oslo Øst',
    audioFile: esopOsloAudio,
    gcloudResponse: esopOsloResponse,
  },
  {
    name: 'Sola og Nordavinden Stavanger',
    audioFile: esopStavangerAudio,
    gcloudResponse: esopStavangerResponse,
  },
  {
    name: 'Sola og Nordavinden Bergen',
    audioFile: esopBergenAudio,
    gcloudResponse: esopBergenResponse,
  },
  {
    name: 'Tørnquist og Jan Thomas blir venner podcast',
    audioFile: tørnquistJanthomasAudio,
    gcloudResponse: tørnquistJanthomasResponse,
  },
  {
    name: 'Språkteigen podcast',
    audioFile: språkteigenAudio,
    gcloudResponse: språkteigenResponse,
  },
].map((x, i) => ({ ...x,
  id: i
}))